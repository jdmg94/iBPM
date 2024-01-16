import '@emotion/react';

type Colors = 'text' | 'accent' | 'background' | 'delete' | 'info' | 'success'

declare module '@emotion/react' {
	export interface Theme {
		colors: Record<Colors, string>;
	};
}