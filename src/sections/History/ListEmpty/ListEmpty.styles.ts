import styled from "@emotion/native";

export const Label = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${props => props.theme.colors.subtext};
`;
export const Container = styled.View`
  flex: 1;
  margin-top: 72px;
  min-height: 300px;
`;