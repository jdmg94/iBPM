import styled from '@emotion/native';

export const Button = styled.Pressable`
	height: 50px;
	width: 70%;
	border-radius: 50%;
	border: solid 2px ${props => props.theme.colors.text};
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
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
`;
