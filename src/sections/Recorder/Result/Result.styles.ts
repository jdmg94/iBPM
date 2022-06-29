import styled, { css } from "@emotion/native";

export const Title = styled.Text`
  font-weight: 200;
  font-size: 80px;
`;
export const Subtitle = styled.Text`
  font-size: 64px;
  font-weight: bold;
`;

export const Label = styled.Text`
  font-weight: 600;
`;

export const Button = styled.Pressable`
  height: 50px;
  width: 70%;
  border-radius: 50%;
  border: solid 2px black;
  align-items: center;
  justify-content: center;
  margin: 8px 0px;
`;

export const TextGroup = styled.View`
  align-items: baseline;
  justify-content: center;
  flex-direction: row;
`;

export const Wrapper = styled.View`
  flex: 2;
  width: 100%;
  padding-top: 8px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;