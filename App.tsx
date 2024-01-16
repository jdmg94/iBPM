import "react-native-gesture-handler";
import { useEffect } from "react";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { prepareCacheDirectory } from "@/utils/cache";
import { prepareToRecord, getAudioPermissions } from "@/AudioService";

import AppProvider from "./src/AppProvider";
import History from "./src/sections/History";
import Recorder from "./src/sections/Recorder";

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    prepareCacheDirectory();
    getAudioPermissions().then(prepareToRecord);
  }, []);

  return (
    <AppProvider>
      <StatusBar style="auto" />
      <History />
      <Recorder />
    </AppProvider>
  );
}
