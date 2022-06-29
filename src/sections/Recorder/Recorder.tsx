import { useState, useEffect } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import Result from "./Result/Result";
import { State, useAppState } from "../../Context";
import { RecordingLoader, ProcessingLoader } from "./Loaders";
import { Wrapper, Handle, Button, Label } from "./Recorder.styles";
import { captureAudioSample, determineBPM } from "../../AudioService";

const Recorder = () => {
  const [duration] = useState(8000);
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");
  const { status, setStatus } = useAppState();

  const translateY = useSharedValue(350);
  const isDrawerOpen = useSharedValue(false);
  const animation = useAnimatedStyle(() => {
    if (status === State.IDLE && !isDrawerOpen.value) {
      translateY.value = withSpring(350, {
        overshootClamping: true,
      });
    } else {
      translateY.value = withSpring(isDrawerOpen.value ? 0 : 250, {
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

  useEffect(() => {
    switch (status) {
      case State.IDLE:
        setMessage("");
        isDrawerOpen.value = false;
        break;
      case State.RECORDING:
        isDrawerOpen.value = false;
        setMessage("Capturing Audio Sample");
        captureAudioSample(duration).then(({ sound }) => {
          determineBPM(sound).then((bpm) => {
            console.log('hello BPM!', bpm)
            setResult(bpm);
            setStatus(State.DONE);
          }).catch(() => {
            setStatus(State.IDLE)
          });
          setStatus(State.PROCESSING);
        });
        break;
      case State.PROCESSING:
        setMessage("Calculating Beats");
        break;
      case State.DONE:
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
      {status === State.IDLE && (
        <Button onPress={() => setStatus(State.RECORDING)} />
      )}
      {status === State.RECORDING && (
        <RecordingLoader
          duration={duration}
          onRest={() => setStatus(State.PROCESSING)}
        />
      )}
      {status === State.PROCESSING && <ProcessingLoader />}
      <Label>{message}</Label>
      {status === State.DONE && <Result bpm={result} />}
    </Wrapper>
  );
};

export default Recorder;
