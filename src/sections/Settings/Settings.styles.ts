import styled from '@emotion/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { flexbox, layout, space, typography } from 'styled-system'

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 8px;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.background};
`

export const Row = styled.View`
  height: auto;
  min-height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.background};
  ${flexbox}
`

export const Input = styled.TextInput`
  ${layout}
  ${space}
	${typography}
	min-width: 60px;
  padding: 8px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.accent};
`
