import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import History from "./src/sections/History";
import Recorder from "./src/sections/Recorder";

import {
  determineBPM,
  captureAudioSample,
  prepareAudioCapabilities,
} from "./src/AudioService";

export default function App() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    prepareAudioCapabilities();
  }, []);

  const doTheThang = async () => {
    setStatus("recording");
    const { sound } = await captureAudioSample(10);
    setStatus("processing");

    const bpm = await determineBPM(sound);

    Alert.alert("the BPM is aproximately:", `${bpm}bpm`);
    setStatus("idle");
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <History />
      <Recorder />
    </SafeAreaProvider>
  );
}
