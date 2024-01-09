import { Alert } from "react-native";
import { useDispatch } from "@/hooks";
import { useSelector } from '@/hooks'
import { getUnixTime } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";
import { useState, useCallback } from "react";
import type { BPMRecord } from "@/types/BPMRecord";
import { RecordStatus as Status } from "@/types/RecordStatus";
import { documentDirectory, moveAsync } from "expo-file-system";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  prepareToRecord,
  determineBPM,
  captureAudioSample,
} from "@/AudioService";

import Result from "./Result";
import { addRecord } from "../History";
import { useInteraction } from "./useInterations";
import { RecordingLoader, ProcessingLoader } from "./Loaders";
import {
  Label,
  Handle,
  Wrapper,
  Button,
  ButtonOutline,
} from "./Recorder.styles";

const Recorder = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState<BPMRecord>();
  const [status, setStatus] = useState(Status.IDLE);
  const { animation, verticalDrag } = useInteraction(status);
  const duration = useSelector(state => state.Settings.duration);

  const captureBPM = useCallback(async () => {
    await prepareToRecord();
    const id = nanoid();
    const to = `${documentDirectory}recordings/${id}.m4a`;

    setStatus(Status.RECORDING);
    const buffer = await captureAudioSample(duration);
    setStatus(Status.PROCESSING);
    moveAsync({
      from: buffer.uri,
      to,
    }).catch((err) => {
      // @ts-ignore - might fail, don't want it to affect user experience tho
      Alert.alert("something went wrong moving the file! " + err.message);
    });
    const tempo = await determineBPM(buffer.sound);

    setStatus(Status.DONE);
    setResult({
      id,
      label: id,
      bpm: tempo,
      uri: to,
      timestamp: getUnixTime(new Date()),
    });
  }, []);

  const addToHistory = () =>
    Alert.prompt("Name The New Item", undefined, [
      {
        text: "Save",
        onPress: (label) => {
          if (!label || label.length == 0) {
            addToHistory();
          } else if (result) {
            setStatus(Status.IDLE);
            dispatch(
              addRecord({
                ...result,
                label,
              })
            );
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);

  return (
    <Wrapper style={animation}>
      {status === Status.DONE && (
        <PanGestureHandler onGestureEvent={verticalDrag}>
          <Handle hitSlop={{ top: 20, bottom: 50, left: 150, right: 150 }} />
        </PanGestureHandler>
      )}
      {status === Status.IDLE && (
        <ButtonOutline>
          <Button onPress={captureBPM} />
        </ButtonOutline>
      )}
      {status === Status.RECORDING && <RecordingLoader duration={duration} />}
      {status === Status.PROCESSING && <ProcessingLoader />}
      <Label>
        {
          {
            [Status.IDLE]: "",
            [Status.RECORDING]: "Capturing Audio Sample",
            [Status.PROCESSING]: "Calculating Beats",
            [Status.DONE]: " Approximately:",
            [Status.ERROR]: "Error",
          }[status]
        }
      </Label>
      {status === Status.DONE && (
        <Result
          bpm={result?.bpm}
          onRetry={captureBPM}
          onSave={addToHistory}
          onComplete={() => setStatus(Status.IDLE)}
        />
      )}
    </Wrapper>
  );
};

export default Recorder;
