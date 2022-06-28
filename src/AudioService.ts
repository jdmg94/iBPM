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
  durationInSeconds = 5,
  soundOptions = {
    isMuted: true,
  }
): Promise<SampleRecording> => {
  const recording = new Audio.Recording();
  const status = await recording.getStatusAsync();
  const durationInMilis = durationInSeconds * 1000;

  if (!status.canRecord) {
    const { ios, android } = Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY;
    await recording.prepareToRecordAsync({      
      keepAudioActiveHint: true,
      android: android,
      ios: {
        ...ios,        
        numberOfChannels: 1,
        linearPCMIsFloat: true,
        linearPCMIsBigEndian: false,
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
      },
    } as Audio.RecordingOptions);
  }

  recording.startAsync();

  await sleep(durationInMilis);
  await recording.stopAndUnloadAsync();
  const uri = await recording.getURI()!;
  const { sound } = await recording.createNewLoadedSoundAsync(soundOptions);

  return { sound, uri };
};

export const determineBPM = (sound: Audio.Sound) =>
  new Promise((resolve) => {
    const linearPCMData: number[] = [];
    sound.setOnPlaybackStatusUpdate((status) => {
      if ((status as AVPlaybackStatusSuccess).didJustFinish) {
        const { tempo } = new musicTempo(linearPCMData);
        resolve(Math.ceil(tempo));
      }
    });
    sound.setOnAudioSampleReceived((sample) => {
      linearPCMData.push(...sample.channels[0].frames);
    });

    sound.playAsync();
  });
