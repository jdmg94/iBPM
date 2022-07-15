import musicTempo from "music-tempo";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";

const sleep = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

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
  soundOptions = {
    isMuted: true,
  }
): Promise<SampleRecording> => {
  const recording = new Audio.Recording();
  const status = await recording.getStatusAsync();

  if (!status.canRecord) {
    const { ios, android, web } = Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY;
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
      android: {
        ...android,
        ...myOptions,
      },
      ios: {
        ...ios,
        ...myOptions,
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
      },
    });
  }

  recording.startAsync();

  await sleep(duration);
  await recording.stopAndUnloadAsync();
  const uri = await recording.getURI()!;
  const { sound } = await recording.createNewLoadedSoundAsync(soundOptions);

  // keep at 4x to increase PCM data collection speed
  // faster rates reduce accuracy
  await sound.setStatusAsync({ rate: 4 });

  return { sound, uri };
};

export const determineBPM = (sound: Audio.Sound): Promise<number> =>
  new Promise((resolve) => {
    const linearPCMData: number[] = [];
    sound.setOnPlaybackStatusUpdate((status) => {
      if ((status as AVPlaybackStatusSuccess).didJustFinish) {
        sound.stopAsync().then(() => {
          sound.unloadAsync();
        });

        const { tempo } = new musicTempo(linearPCMData);
        resolve(Math.floor(tempo));
      }
    });
    sound.setOnAudioSampleReceived((sample) => {
      linearPCMData.push(...sample.channels[0].frames);
    });

    sound.playAsync();
  });
