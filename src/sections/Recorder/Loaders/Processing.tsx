import styled from "@emotion/native";
import { useRef, useEffect } from "react";
import Lottie from "lottie-react-native";

const Wrapper = styled.View`
  height: 120px;
  position: relative;
`;

export const ProcessingLoader = () => {
  const loader = useRef<Lottie>(null);

  useEffect(() => {
    setTimeout(() => loader.current?.play(0))
  }, []);

  return (
    <Wrapper pointerEvents="none">
      <Lottie
        loop
        autoSize
        ref={loader}
        source={require("../../../../assets/processing.json")}
        style={{          
          position: 'absolute',
          top: -60,
          left: -90,
          transform: [{ scale: 0.9 }]
        }}
      />
    </Wrapper>
  );
};
