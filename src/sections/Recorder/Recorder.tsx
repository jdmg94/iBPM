import { useState, useEffect } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import Result from "./Result";
import useRecorder, { Status } from "./useRecorder";
import { RecordingLoader, ProcessingLoader } from "./Loaders";
import {
  Label,
  Handle,
  Wrapper,
  Button,
  ButtonOutline,
} from "./Recorder.styles";

const Recorder = () => {
  const [duration] = useState(6000);
  const { status, message, result, setStatus } = useRecorder(duration);

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

  useEffect(() => {
    switch (status) {
      case Status.IDLE:
      case Status.RECORDING:
        isDrawerOpen.value = false;
        break;

      case Status.DONE:
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
      {status === Status.DONE && (
        <Result
          bpm={result}
          onComplete={() => setStatus(Status.IDLE)}
          onRetry={() => setStatus(Status.RECORDING)}
        />
      )}
    </Wrapper>
  );
};

export default Recorder;
