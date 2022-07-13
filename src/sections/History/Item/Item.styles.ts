import styled from "@emotion/native";

export const Wrapper = styled.View`
  height: 80px;
  width: auto;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 8px;
  margin: 8px;
`;

export const Column = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.colors.text};
`;

export const Detail = styled.View`
  height: 100%;
  width: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.accent};
  border-radius: 4px;
`;
export const Label = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

export const Sublabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  
`;

export const Separator = styled.View`
  height: 1px;
  width: 95%;
  background-color: #0004;
  margin: 0 auto;
`;
