import styled from '@emotion/native'
import { space, typography } from 'styled-system'

export const Span = styled.Text`
  ${space}
  ${typography}	
  color: ${(props) => props.theme.colors.text};
`

export const Title = styled(Span)`
  font-weight: 600;
  font-size: 48px;
`

export const Subtext = styled(Span)`
  color: ${(props) => props.theme.colors.subtext};
`

export const Label = styled(Span)`
  font-size: 20px;
  font-weight: 400;
`
