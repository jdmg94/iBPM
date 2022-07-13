import styled from "@emotion/native";

export const Wrapper = styled.View`
  height: 80px;
  width: auto;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #0004;
  border-radius: 8px;
  margin: 8px;
`;

export const Column = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-size: 20px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

export const Detail = styled.View`
  height: 100%;
  width: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0002;
  border-radius: 4px;
`;
export const Label = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${(props) => props.color || "#000"};
`;

export const Sublabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 95%;
  background-color: #0004;
  margin: 0 auto;
`;
