import { FC } from "react";
import { Animated, ViewStyle } from "react-native";
import { Wrapper, Container, Rim, Label } from "./Action.styles";

type ActionProps = {
  color: string;
  label: string;
  style: Animated.WithAnimatedObject<ViewStyle>;
  onPress: () => void;
};

const ActionItem: FC<ActionProps> = ({ children, label, style, color, onPress }) => (
  <Wrapper style={style} onPress={onPress}>
    <Rim color={color}>
      <Container color={color}>
        <Label>{label}</Label>
      </Container>
    </Rim>
  </Wrapper>
);

export default ActionItem;
