import { useEffect } from "react";
import History from "@/sections/History";
import Recorder from "@/sections/Recorder";
import { prepareCacheDirectory } from "@/utils/cache";
import { prepareToRecord, getAudioPermissions } from "@/AudioService";

export default function App() {
  useEffect(() => {
    prepareCacheDirectory();
    getAudioPermissions().then(prepareToRecord);
  }, []);

  return (
    <>
      <History />
      <Recorder />
    </>
  );
}
