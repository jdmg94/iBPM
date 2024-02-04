import styled from '@emotion/native';

export const Title = styled.Text`
	font-weight: 600;
	font-size: 48px;
	color: ${props => props.theme.colors.text};
`;

export const Row = styled.View`
  flex: 1;
	padding: 8px;
	height: 68px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
