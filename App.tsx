import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import History from "./src/sections/History";
import Recorder from "./src/sections/Recorder";
import { prepareAudioCapabilities } from "./src/AudioService";

export default function App() {
  useEffect(() => {
    prepareAudioCapabilities();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <History />
      <Recorder />
    </SafeAreaProvider>
  );
}
