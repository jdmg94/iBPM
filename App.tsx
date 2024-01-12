import "react-native-gesture-handler";
import { useEffect } from "react";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { prepareCacheDirectory } from "@/utils/cache";

import AppProvider from "./src/AppProvider";
import History from "./src/sections/History";
import Recorder from "./src/sections/Recorder";

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    prepareCacheDirectory();
  }, []);

  return (
    <AppProvider>
      <StatusBar style="auto" />
      <History />
      <Recorder />
    </AppProvider>
  );
}
