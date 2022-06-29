import styled from "@emotion/native";
import Animated from "react-native-reanimated";

export const Wrapper = styled(Animated.View)`
  bottom: 0;
  left: 0;
  align-items: center;
  flex-direction: column;
  position: absolute;
  height: 80%;
  width: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #ccc;
`;

export const Handle = styled(Animated.View)`
  height: 8px;
  width: 60px;
  margin: 8px 0px;
  border-radius: 50%;
  background-color: #0004;
`;

export const Button = styled.Pressable`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #f00;
  margin-top: 16px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  transition: 1s;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  margin-top: 16px;
`;
