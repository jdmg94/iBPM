import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { prepareToRecord } from "@/AudioService";
import { prepareCacheDirectory } from "@/utils/cache";

import AppProvider from "./src/AppProvider";
import History from "./src/sections/History";
import Recorder from "./src/sections/Recorder";

prepareToRecord();
prepareCacheDirectory();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <History />
      <Recorder />
    </AppProvider>
  );
}
