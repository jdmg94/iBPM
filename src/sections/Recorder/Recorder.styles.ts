import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

export const Wrapper = styled(Animated.View)`
	bottom: 0;
	left: 0;
	align-items: center;
	flex-direction: column;
	position: absolute;
	height: 60%;
	width: 100%;
	max-width: 400px;
	border-radius: 24px 24px 0px 0px;
	background-color: ${props => props.theme.colors.accent};
`;

export const Handle = styled(Animated.View)`
	height: 8px;
	width: 60px;
	margin: 8px 0px;
	border-radius: 30px;
	background-color: #0004;
`;

export const ButtonOutline = styled.View`
	margin-top: 16px;
	border-radius: 37.5px;
	height: 75px;
	width: 75px;
	align-items: center;
	justify-content: center;
	border: solid 4px #fff;
`;

export const Button = styled.Pressable`
	background-color: #f00;
	height: 60px;
	width: 60px;
	border-radius: 30px;
	transition: 1s;
`;

export const AdBanner = styled.View`
	width: 100%;
	flex: 1;
	background-color: #4f44;
	margin: 16px 0px;
	align-items: center;
	justify-content: center;
`;
