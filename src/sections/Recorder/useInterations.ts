import { useEffect } from 'react'
import { Platform } from 'react-native'
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { RecorderStatus as Status } from './Recorder.slice'

const initialOffset = Platform.select({
  android: 340,
  ios: 360,
})!;

const workingOffset = Platform.select({
  android: 280,
  ios: 280,
})!;

export const useInteraction = (status: Status) => {
  const translateY = useSharedValue(initialOffset);
  const isDrawerOpen = useSharedValue(false);
  const animation = useAnimatedStyle(() => {
    if (status === Status.IDLE && !isDrawerOpen.value) {
      translateY.value = withSpring(initialOffset, {
        overshootClamping: true,
      });
    } else {
      translateY.value = withSpring(isDrawerOpen.value ? 0 : workingOffset, {
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
      if (nextValue >= 0 && nextValue <= initialOffset) {
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

  return {
    animation,
    verticalDrag,
  }
}