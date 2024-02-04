import styled from "@emotion/native";
import Lottie from "lottie-react-native";
import animation from "assets/loading.json";

const Wrapper = styled.View`
  height: 120px;
  width: 100%;
	margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

export const ProcessingLoader = () => (
  <Wrapper pointerEvents="none">
    <Lottie
      loop
      autoPlay
      source={animation}
      style={{
        height: 75,
        width: "100%",
      }}
    />
  </Wrapper>
);
