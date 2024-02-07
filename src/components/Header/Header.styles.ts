import styled from "@emotion/native";
import { flexbox, space } from "styled-system";

export const Title = styled.Text`
	font-weight: 600;
	font-size: 48px;
	color: ${props => props.theme.colors.text};
`;

export const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: ${props => props.theme.spacing.header}px;
	${flexbox}
`
