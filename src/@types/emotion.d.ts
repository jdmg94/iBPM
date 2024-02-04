import '@emotion/react';

type Colors = 'text' | 'subtext' | 'accent' | 'background' | 'delete' | 'info' | 'success' | 'segmentedControlAccent'

declare module '@emotion/react' {
	export interface Theme {
		colors: Record<Colors, string>;
	};
}