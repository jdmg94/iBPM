import { useEffect } from "react";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvider } from "./src/Context";
import History from "./src/sections/History";
import Recorder from "./src/sections/Recorder";
import { prepareAudioCapabilities } from "./src/AudioService";

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    prepareAudioCapabilities();
  }, []);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="auto" />
        <History />
        <Recorder />
      </AppProvider>
    </SafeAreaProvider>
  );
}
