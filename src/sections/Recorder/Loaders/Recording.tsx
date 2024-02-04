import styled from "@emotion/native";
import { useEffect, useRef, FC } from "react";
import animation from "assets/recording.json";
import LottieView from "lottie-react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

type Loader = {
  duration?: number;
  onRest?: () => void;
};

const Wrapper = styled.View`
  height: 120px;
  width: 100%;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

const Lottie = Animated.createAnimatedComponent(LottieView);

export const RecordingLoader: FC<Loader> = ({ onRest, duration = 15000 }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration,
    });
  }, []);

  return (
    <Wrapper>
      <Lottie
        loop={false}
        source={animation}
        progress={progress}
        style={{
          height: 120,
          flex: 1,
          width: "95%",
        }}
      />
    </Wrapper>
  );
};
