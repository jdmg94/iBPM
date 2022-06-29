import { useState, useEffect } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import { RecordingLoader, ProcessingLoader } from "./Loaders";
import { Wrapper, Handle, Button, Label } from "./Recorder.styles";

enum State {
  IDLE,
  RECORDING,
  PROCESSING,
  DONE,
  ERROR,
}

const Recorder = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<State>(State.IDLE);

  const translateY = useSharedValue(500);
  const isDrawerOpen = useSharedValue(false);
  const animation = useAnimatedStyle(() => {
    if (status === State.IDLE && !isDrawerOpen.value) {
      translateY.value = withSpring(500, {
        overshootClamping: true,
      });
    } else {
      translateY.value = withSpring(isDrawerOpen.value ? 0 : 420, {
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

      if (nextValue >= 0 && nextValue <= 500) {
        translateY.value = nextValue;
      }
    },
    onEnd: () => {
      if (translateY.value > 300) {
        isDrawerOpen.value = false;
      } else {
        isDrawerOpen.value = true;
      }
    },
  });

  useEffect(() => {
    switch (status) {
      case State.RECORDING:
        setMessage("Capturing Audio Sample");
        break;
      case State.PROCESSING:
        setMessage("Calculating Beats");
        setTimeout(() => {
          setStatus(State.DONE);
        }, 5000);
        break;
      case State.DONE:
        setMessage("The BPM is Approximately:");
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
        <RecordingLoader onRest={() => setStatus(State.PROCESSING)} />
      )}
      {status === State.PROCESSING && <ProcessingLoader />}
      <Label>{message}</Label>
    </Wrapper>
  );
};

export default Recorder;
