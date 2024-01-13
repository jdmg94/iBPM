import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { prepareCacheDirectory } from "@/utils/cache";

import AppProvider from "./src/AppProvider";
import History from "./src/sections/History";
import Recorder from "./src/sections/Recorder";

LogBox.ignoreAllLogs();
prepareCacheDirectory();

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <History />
      <Recorder />
    </AppProvider>
  );
}
