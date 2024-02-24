import styled from '@emotion/native'
import Lottie from 'lottie-react-native'
import animation from 'assets/deck.json'

const Wrapper = styled.View`
  height: 130px;
  width: 100%;
  margin: 16px 0px;
  align-items: center;
  justify-content: center;
`

export const ProcessingLoader = () => (
  <Wrapper pointerEvents="none">
    <Lottie
      loop
      autoPlay
      resizeMode="cover"
      source={animation}
      style={{
        height: '100%',
        width: '80%',
        marginTop: 16,
      }}
    />
  </Wrapper>
)
