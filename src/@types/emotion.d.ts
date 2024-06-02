import '@emotion/react'

type Colors =
  | 'text'
  | 'subtext'
  | 'accent'
  | 'background'
  | 'delete'
  | 'info'
  | 'warning'
  | 'success'
  | 'segmentedControlAccent'
type Spacing = 'header'

declare module '@emotion/react' {
  export interface Theme {
    colors: Record<Colors, string>
    spacing: Record<Spacing, number>
  }
}
