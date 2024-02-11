import styled from '@emotion/native';

export const Wrapper = styled.View`
	height: 80px;
	width: auto;
	padding: 8px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-radius: 16px;
	margin: 8px;
`;

export const Column = styled.View`
	flex: 1;
	flex-direction: column;
`;

export const Detail = styled.View`
	height: 100%;
	width: 60px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.colors.accent};
	border-radius: 8px;
`;

export const Separator = styled.View`
	height: 1px;
	width: 95%;
	background-color: ${props => props.theme.colors.text}4;
	margin: 0 auto;
`;
