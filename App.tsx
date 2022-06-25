import { useEffect, useState } from "react";
import { Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { deleteAsync, getInfoAsync } from "expo-file-system";

import { Button } from "./src/components/Button";
import { Container } from "./src/components/Container";
import {
  determineBPM,
  captureAudioSample,
  prepareAudioCapabilities,
} from "./src/AudioService";

export default function App() {
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    prepareAudioCapabilities();
  }, []);

  const doTheThang = async () => {
    try {
      
      setStatus('recording')
      const { sound } = await captureAudioSample(15);
      setStatus('processing')
      
      const bpm = await determineBPM(sound)

      Alert.alert('the BPM is aproximately:', `${bpm}bpm`)
      setStatus('idle')    
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <Text>Tap The Button below to start sampling</Text>
      <Button disabled={status === 'processing'} onPress={doTheThang}>
        <Text style={{ color: "#FFF" }}>
          {status === 'idle' ? "Record Sample" : "Recording..."}
        </Text>
      </Button>
    </Container>
  );
}
