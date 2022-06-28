import styled from '@emotion/native'

export const Wrapper = styled.View`
  bottom: 0;
  left: 0;
  flex-direction: column;
  position: absolute;
  height: 80%;
  width: 100%;
  border: solid 1px #000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #4f44;

`

export const Button = styled.Pressable<{ isActive: boolean }>`
  
`