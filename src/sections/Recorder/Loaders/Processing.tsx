import styled from '@emotion/native';
import {useRef, useEffect} from 'react';
import Lottie from 'lottie-react-native';

const Wrapper = styled.View`
	height: 120px;
	align-items: center;
	justify-content: center;
`;

export const ProcessingLoader = () => {
	const loader = useRef<Lottie>(null);

	useEffect(() => {
		setTimeout(() => loader.current?.play(0));
	}, []);

	return (
		<Wrapper pointerEvents="none">
			<Lottie
				loop
				autoSize
				ref={loader}
				source={require('assets/loading.json')}
			/>
		</Wrapper>
	);
};
