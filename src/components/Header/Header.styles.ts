import styled from "@emotion/native";
import { flexbox } from "styled-system";

export const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: ${props => props.theme.spacing.header}px;
	${flexbox}
`
