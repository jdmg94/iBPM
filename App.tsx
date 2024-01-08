import 'react-native-gesture-handler';
import {useEffect} from 'react';
import {LogBox} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import AppProvider from './src/AppProvider';
import History from './src/sections/History';
import Recorder from './src/sections/Recorder';
import {prepareAudioCapabilities} from './src/AudioService';

LogBox.ignoreAllLogs();

export default function App() {
	useEffect(() => {
		prepareAudioCapabilities();
	}, []);

	return (
		<AppProvider>			
			<StatusBar style="auto" />
			<History />
			<Recorder />
		</AppProvider>
	);
}
