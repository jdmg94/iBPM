import { FC } from "react";
import { Animated, ViewStyle } from "react-native";
import { Wrapper, Container, Rim } from "./Action.styles";

type ActionProps = {
  color: string;
  style: Animated.WithAnimatedObject<ViewStyle>;
  onPress: () => void;
};

const ActionItem: FC<ActionProps> = ({ children, style, color, onPress }) => (
  <Wrapper style={style} onPress={onPress}>
    <Rim  color={color}>
      <Container color={color}>{children}</Container>
    </Rim>
  </Wrapper>
);

export default ActionItem;
