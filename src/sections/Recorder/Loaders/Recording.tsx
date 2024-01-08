import styled from '@emotion/native';
import {Animated} from 'react-native';
import Lottie from 'lottie-react-native';
import {useEffect, useRef, FC} from 'react';

type Loader = {
	duration?: number;
	onRest?: () => void;
};

const Wrapper = styled.View`
	height: 120px;
	align-items: center;
	justify-content: center;
`;

export const RecordingLoader: FC<Loader> = ({onRest, duration = 15000}) => {
	const captureProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		captureProgress.current.addListener(Progress => {
			if (Progress.value === 1) {
				onRest?.();
			}
		});

		Animated.timing(captureProgress.current, {
			toValue: 1,
			duration,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<Wrapper>
			<Lottie
				loop={false}
				progress={captureProgress.current}
				source={require('../../../../assets/recording.json')}
				style={{
					height: 70,
				}}
			/>
		</Wrapper>
	);
};
