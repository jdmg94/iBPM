import React, { FC } from "react";
import { Span } from "@/components/Text";
import { Animated, ViewStyle } from "react-native";
import { Wrapper, Container, Rim } from "./Action.styles";

type ActionProps = {
  color: string;
  label: string | React.ReactNode;
  onPress: () => void;
  style: Animated.WithAnimatedObject<ViewStyle>;
};

const ActionItem: FC<ActionProps> = ({ label, style, color, onPress }) => (
  <Wrapper style={style} onPress={onPress}>
    <Rim color={color}>
      <Container color={color}>
        {typeof label === "string" ? (
          <Span fontSize={16} style={{ color: "#FFF" }}>
            {label}
          </Span>
        ) : (
          label
        )}
      </Container>
    </Rim>
  </Wrapper>
);

export default ActionItem;
