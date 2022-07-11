import { useState, useEffect } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import Result from "./Result/Result";
import { useSelector, useDispatch } from "../../hooks";
import { Status, updateStatus } from "./Recorder.slice";
import { RecordingLoader, ProcessingLoader } from "./Loaders";
import { captureAudioSample, determineBPM } from "../../AudioService";
import {
  Label,
  Handle,
  Wrapper,
  Button,
  ButtonOutline,
} from "./Recorder.styles";

const Recorder = () => {
  const dispatch = useDispatch();
  const [duration] = useState(6000);
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");
  const status = useSelector((state) => state.Recorder.status);

  const translateY = useSharedValue(350);
  const isDrawerOpen = useSharedValue(false);
  const animation = useAnimatedStyle(() => {
    if (status === Status.IDLE && !isDrawerOpen.value) {
      translateY.value = withSpring(340, {
        overshootClamping: true,
      });
    } else {
      translateY.value = withSpring(isDrawerOpen.value ? 0 : 230, {
        overshootClamping: true,
      });
    }

    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const verticalDrag = useAnimatedGestureHandler({
    onStart: (_, context: { startY: number }) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      const nextValue = context.startY + event.translationY;
      if (nextValue >= 0 && nextValue <= 350) {
        translateY.value = nextValue;
      }
    },
    onEnd: () => {
      if (translateY.value >= 150) {
        isDrawerOpen.value = false;
      } else {
        isDrawerOpen.value = true;
      }
    },
  });

  const setStatus = (nextState: Status) => dispatch(updateStatus(nextState));

  useEffect(() => {
    switch (status) {
      case Status.IDLE:
        setMessage("");
        isDrawerOpen.value = false;
        break;
      case Status.RECORDING:
        isDrawerOpen.value = false;
        setMessage("Capturing Audio Sample");
        captureAudioSample(duration).then(({ sound }) => {
          determineBPM(sound)
            .then((bpm) => {
              setResult(bpm);
              setStatus(Status.DONE);
            })
            .catch(() => {
              setStatus(Status.IDLE);
            });
          setStatus(Status.PROCESSING);
        });
        break;
      case Status.PROCESSING:
        setMessage("Calculating Beats");
        break;
      case Status.DONE:
        setMessage(" Approximately:");
        isDrawerOpen.value = true;
        break;
    }
  }, [status]);

  return (
    <Wrapper style={animation}>
      <PanGestureHandler onGestureEvent={verticalDrag}>
        <Handle hitSlop={{ top: 20, bottom: 50, left: 150, right: 150 }} />
      </PanGestureHandler>
      {status === Status.IDLE && (
        <ButtonOutline>
          <Button onPress={() => setStatus(Status.RECORDING)} />
        </ButtonOutline>
      )}
      {status === Status.RECORDING && (
        <RecordingLoader
          duration={duration}
          onRest={() => setStatus(Status.PROCESSING)}
        />
      )}
      {status === Status.PROCESSING && <ProcessingLoader />}
      <Label>{message}</Label>
      {status === Status.DONE && <Result bpm={result} />}
    </Wrapper>
  );
};

export default Recorder;
