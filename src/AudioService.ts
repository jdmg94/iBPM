import musicTempo from 'music-tempo';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

const sleep = async (timeout: number) =>
	new Promise(resolve => setTimeout(resolve, timeout));

export const getAudioPermissions = async () => {
	const permissions = await Audio.getPermissionsAsync();

	if (!permissions.granted && permissions.canAskAgain) {
		await Audio.requestPermissionsAsync();
	}
}

export const prepareToPlay = async () => {
	await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
}

export const prepareToRecord = async () => {
	await Audio.setAudioModeAsync({
		allowsRecordingIOS: true,
		playsInSilentModeIOS: true,
		staysActiveInBackground: true,
	});
};

export const getAudioFromURI = async (uri: string) => {
	const { sound } = await Audio.Sound.createAsync({ uri }, {
		shouldPlay: false,
		isMuted: false,
		volume: 1.0,
	});

	return sound;
}

type SampleRecording = {
	sound: Audio.Sound;
	uri: string;
};

type CaptureAudioSampleFunction = (
	duration?: number,
	quality?: 'high' | 'low'
) => Promise<SampleRecording>;

export const captureAudioSample: CaptureAudioSampleFunction = async (
	duration = 15000,
	quality = "high"
) => {
	const recording = new Audio.Recording();
	const status = await recording.getStatusAsync();

	if (!status.canRecord) {
		const qualityLevel = quality === "high"
			? Audio.RecordingOptionsPresets.HIGH_QUALITY
			: Audio.RecordingOptionsPresets.LOW_QUALITY;

		const { ios, android, web } = qualityLevel
		const myOptions = {
			numberOfChannels: 1,
			linearPCMIsFloat: true,
			linearPCMIsBigEndian: false,
		};

		const recordingStatus = await recording.getStatusAsync();

		if (!recordingStatus.canRecord) {
			await recording.prepareToRecordAsync({
				keepAudioActiveHint: true,
				web: {
					...web,
					...myOptions,
				},
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
	}

	recording.startAsync();

	await sleep(duration);
	await recording.stopAndUnloadAsync();
	const [uri, { sound }] = await Promise.all([
		recording.getURI(),
		recording.createNewLoadedSoundAsync({
			volume: 0,
			isMuted: true,
		})
	]);

	// keep at 4x to increase PCM data collection speed
	// faster rates reduce accuracy
	await sound.setStatusAsync({ rate: 4 });

	return { sound, uri: uri! };
};

export const determineBPM = (sound: Audio.Sound): Promise<number> => new Promise((resolve, reject) => {
	const linearPCMData: number[] = [];

	const timeoutRef = setTimeout(() => {
		reject('No information could be collected from sample');
	}, 3000);

	sound.setOnPlaybackStatusUpdate(status => {
		if (status.isLoaded && status.didJustFinish) {
			clearTimeout(timeoutRef);
			if (linearPCMData.length > 0) {
				sound.unloadAsync();
				const { tempo } = musicTempo(linearPCMData, {
					minBeatInterval: 0.375 // max 160bpm
				});

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
