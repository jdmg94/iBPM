import styled from '@emotion/native'
import { RectButton } from 'react-native-gesture-handler'

export const Wrapper = styled.View`
  height: 80px;
  width: 100%;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-size: 18px;  
`

export const Detail = styled.View`
  height: 100%;
  width: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0002;
  border-radius: 4px;
`
export const Label = styled.Text`
  font-size: 16px;
`

export const Sublabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
`

export const Separator = styled.View`
  height: 1px; 
  width: 95%;
  background-color: #0004;
  margin: 0 auto;
`

export const Actions = styled.View``
export const ActionItem = styled(RectButton)``