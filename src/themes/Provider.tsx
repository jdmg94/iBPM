import { useTheme } from '@/hooks'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from '@emotion/react'

const Provider = ({ children }: PropsWithChildren) => {
  const theme = useTheme()

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Provider
