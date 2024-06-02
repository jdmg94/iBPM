import { useEffect } from 'react'
import { Platform, Dimensions } from 'react-native'
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'
import { RecorderStatus as Status } from './Recorder.slice'

const calculateOffsets = () => {
  const screen = Dimensions.get("window")
  const initialOffset = screen.height * 0.43; 
  let workingOffset = screen.height * 0.25;

  if (screen.height > 800) {
    workingOffset = screen.height * 0.30;  
  }

  return [initialOffset, workingOffset]
}

export const useInteraction = (status: Status) => {
  const [initialOffset, workingOffset] = calculateOffsets()
  const translateY = useSharedValue(initialOffset)
  const isDrawerOpen = useSharedValue(false)
  const animation = useAnimatedStyle(() => {
    if (status === Status.IDLE && !isDrawerOpen.value) {
      translateY.value = withSpring(initialOffset, {
        overshootClamping: true,
      })
    } else {
      translateY.value = withSpring(isDrawerOpen.value ? 0 : workingOffset, {
        overshootClamping: true,
      })
    }

    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  const verticalDrag = useAnimatedGestureHandler({
    onStart: (_, context: { startY: number }) => {
      context.startY = translateY.value
    },
    onActive: (event, context) => {
      const nextValue = context.startY + event.translationY
      if (nextValue >= 0 && nextValue <= initialOffset) {
        translateY.value = nextValue
      }
    },
    onEnd: () => {
      if (translateY.value >= 150) {
        isDrawerOpen.value = false
      } else {
        isDrawerOpen.value = true
      }
    },
  })

  useEffect(() => {
    switch (status) {
      case Status.IDLE:
      case Status.RECORDING:
        isDrawerOpen.value = false
        break

      case Status.DONE:
        isDrawerOpen.value = true
        break
    }
  }, [status])

  return {
    animation,
    verticalDrag,
  }
}
