import musicTempo from 'music-tempo';
import {Audio, AVPlaybackStatusSuccess} from 'expo-av';

const sleep = async (timeout: number) =>
	new Promise(resolve => setTimeout(resolve, timeout));

export const prepareAudioCapabilities = async () => {
	const permissions = await Audio.getPermissionsAsync();

	if (!permissions.granted && permissions.canAskAgain) {
		await Audio.requestPermissionsAsync();
	}

	await Audio.setAudioModeAsync({
		allowsRecordingIOS: true,
		playsInSilentModeIOS: true,
		staysActiveInBackground: true,
	});
};

type SampleRecording = {
	sound: Audio.Sound;
	uri: string;
};
export const captureAudioSample = async (
	duration = 15000,
): Promise<SampleRecording> => {
	const recording = new Audio.Recording();
	const status = await recording.getStatusAsync();

	if (!status.canRecord) {
		const {ios, android, web} = Audio.RecordingOptionsPresets.HighQuality;		
		const myOptions = {
			numberOfChannels: 1,
			linearPCMIsFloat: true,
			linearPCMIsBigEndian: false,
		};

		await recording.prepareToRecordAsync({
			keepAudioActiveHint: true,
			web: {
				...web,
				...myOptions,
			},
			// android,
			android: {
				...android,
				audioEncoder: Audio.AndroidAudioEncoder.AAC,
				outputFormat: Audio.AndroidOutputFormat.WEBM,
			},
			ios: {
				...ios,
				...myOptions,
				outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
			},
		});
	}

	recording.startAsync();

	await sleep(duration);
	await recording.stopAndUnloadAsync();
	const uri = await recording.getURI()!;
	const {sound} = await recording.createNewLoadedSoundAsync({
		volume: 1,
		// isMuted: true,
	});

	// keep at 4x to increase PCM data collection speed
	// faster rates reduce accuracy
	await sound.setStatusAsync({rate: 4});

	return {sound, uri};
};

export const determineBPM = (sound: Audio.Sound): Promise<number> =>
	new Promise((resolve, reject) => {
		console.log('hello world')
		const linearPCMData: number[] = [];

		const timeoutRef = setTimeout(() => {
			reject('No information could be collected from sample');
		}, 3000);

		sound.setOnPlaybackStatusUpdate(status => {			
			if ((status as AVPlaybackStatusSuccess).didJustFinish) {
				clearTimeout(timeoutRef);
				if (linearPCMData.length > 0) {
					sound.unloadAsync();
					const {tempo} = new musicTempo(linearPCMData);

					resolve(Math.floor(tempo));
				} else {
					reject('No information could be collected from sample');
				}
			}
		});

		sound.setOnAudioSampleReceived(sample => {
			linearPCMData.push(...sample.channels[0].frames);
		});

		sound.playAsync();
	});
