import styled from '@emotion/native'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export const Wrapper = styled(Animated.createAnimatedComponent(RectButton))`
  height: 100%;
  width: 80px;
  align-items: center;
  justify-content: center;
`

export const Rim = styled.View<{
  color?: string
}>`
  height: 75px;
  width: 75px;

  border-radius: 12px;
  align-items: center;
  justify-content: center;
`

export const Container = styled.View<{
  color?: string
}>`
  height: 69px;
  width: 69px;

  border-radius: 10px;
  border: 1px solid ${(props) => props.color};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`
