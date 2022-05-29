import { useEffect, useState } from "react";
import { Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { deleteAsync } from "expo-file-system";

import { Button } from "./src/components/Button";
import { Container } from "./src/components/Container";
import {
  determineBPM,
  captureAudioSample,
  prepareAudioCapabilities,
} from "./src/AudioService";

export default function App() {
  const [isRecording, setRecording] = useState(false);
  const [recordingURI, setRecordingLocation] = useState<string | null>(null);

  useEffect(() => {
    prepareAudioCapabilities();
  }, []);

  useEffect(
    () => () => {
      if (recordingURI) {
        deleteAsync(recordingURI);
      }
    },
    [recordingURI]
  );

  const doTheThang = async () => {
    try {
      setRecording(true);
      const uri = await captureAudioSample();
      setRecording(false);
      setRecordingLocation(uri);
      console.log("calculating BPM...");
      const result = await determineBPM(uri);

      console.log("done?");
    } catch {
      console.log("error");
    }

    // Alert.alert("the result is: ", result.beats, result.tempo);
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <Text>Tap The Button below to start sampling</Text>
      <Button onPress={doTheThang}>
        <Text style={{ color: "#FFF" }}>
          {!isRecording ? "Record Sample" : "Recording..."}
        </Text>
      </Button>
    </Container>
  );
}
