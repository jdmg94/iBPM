import { Audio } from "expo-av";
import musicTempo from "music-tempo";

export const prepareAudioCapabilities = async () => {
  const permissions = await Audio.getPermissionsAsync();

  if (!permissions.granted && permissions.canAskAgain) {
    await Audio.requestPermissionsAsync();
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });
};

export const captureAudioSample = async (
  durationInSeconds = 5
): Promise<string> => {
  const recording = new Audio.Recording();

  try {
    const status = await recording.getStatusAsync();

    if (!status.canRecord) {
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        recording.stopAndUnloadAsync().then(() => resolve(recording.getURI()!));
      }, durationInSeconds * 1000);
    });
  } catch (e) {
    throw e;
  }
};

export const determineBPM = async (uri: string) => {
  const sound = new Audio.Sound();

  console.log("loading sound");
  await sound.loadAsync({ uri });
  console.log("loaded sound");

  const audioBuffer = await new Promise<number[]>((resolve) => {
    // non-interleaved IEEE754 32-bit linear PCM with a nominal range between -1 and +1
    const audioData: number[] = [];
    sound.setOnAudioSampleReceived((sample) => {
      const channels = [sample.channels[0].frames, sample.channels[1].frames];
      const totalFrames = channels[0].length;

      for (let i = 0; i < totalFrames; i++) {
        audioData[i] = (channels[0][i] + channels[1][i]) / 2;
      }

      resolve(audioData);
    });
  });

  console.log('sample data has been processed!')

  return new musicTempo(audioBuffer);
};
