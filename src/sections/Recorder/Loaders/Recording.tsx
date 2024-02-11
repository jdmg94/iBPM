import styled from '@emotion/native'
import { useEffect, FC } from 'react'
import animation from 'assets/recording.json'
import LottieView from 'lottie-react-native'
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated'

type Loader = {
  duration?: number
}

const Wrapper = styled.View`
  height: 120px;
  width: 100%;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`

const Lottie = Animated.createAnimatedComponent(LottieView)

export const RecordingLoader: FC<Loader> = ({ duration = 15000 }) => {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(1, {
      duration,
      easing: Easing.linear,
    })
  }, [])

  return (
    <Wrapper>
      <Lottie
        loop={false}
        source={animation}
        progress={progress}
        style={{
          height: '100%',
          width: '95%',
        }}
      />
    </Wrapper>
  )
}
