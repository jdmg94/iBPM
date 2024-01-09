import { Alert, Platform } from "react-native";
import { getUnixTime } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";
import { useState, useEffect, useCallback } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import Result from "./Result";
import { addRecord } from "../History";
import { useDispatch } from "../../hooks";
import { RecordingLoader, ProcessingLoader } from "./Loaders";
import { captureAudioSample, determineBPM } from "../../AudioService";
import {
  Label,
  Handle,
  Wrapper,
  Button,
  ButtonOutline,
} from "./Recorder.styles";

export enum Status {
  IDLE,
  RECORDING,
  PROCESSING,
  DONE,
  ERROR,
}

const initialOffset = Platform.select({
  android: 340,
  ios: 360,
})!;

const workingOffset = Platform.select({
  android: 280,
  ios: 280,
})!;

const Recorder = () => {
  const dispatch = useDispatch();
  const [duration] = useState(6000);
  const [result, setResult] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);

  const translateY = useSharedValue(initialOffset);
  const isDrawerOpen = useSharedValue(false);
  const animation = useAnimatedStyle(() => {
    if (status === Status.IDLE && !isDrawerOpen.value) {
      translateY.value = withSpring(initialOffset, {
        overshootClamping: true,
      });
    } else {
      translateY.value = withSpring(isDrawerOpen.value ? 0 : workingOffset, {
        overshootClamping: true,
      });
    }

    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const verticalDrag = useAnimatedGestureHandler({
    onStart: (_, context: { startY: number }) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      const nextValue = context.startY + event.translationY;
      if (nextValue >= 0 && nextValue <= initialOffset) {
        translateY.value = nextValue;
      }
    },
    onEnd: () => {
      if (translateY.value >= 150) {
        isDrawerOpen.value = false;
      } else {
        isDrawerOpen.value = true;
      }
    },
  });

  useEffect(() => {
    switch (status) {
      case Status.IDLE:
      case Status.RECORDING:
        isDrawerOpen.value = false;
        break;

      case Status.DONE:
        isDrawerOpen.value = true;
        break;
    }
  }, [status, result]);

  const guessBPM = useCallback(async () => {
    setStatus(Status.RECORDING);
    const buffer = await captureAudioSample(duration);
    setStatus(Status.PROCESSING);
    const bpm = await determineBPM(buffer.sound);
    setStatus(Status.DONE);
    setResult(bpm);
  }, [duration]);

  return (
    <Wrapper style={animation}>
      {status === Status.DONE && (
        <PanGestureHandler onGestureEvent={verticalDrag}>
          <Handle hitSlop={{ top: 20, bottom: 50, left: 150, right: 150 }} />
        </PanGestureHandler>
      )}
      {status === Status.IDLE && (
        <ButtonOutline>
          <Button onPress={guessBPM} />
        </ButtonOutline>
      )}
      {status === Status.RECORDING && <RecordingLoader duration={duration} />}
      {status === Status.PROCESSING && <ProcessingLoader />}
      <Label>
        {
          {
            [Status.IDLE]: "",
            [Status.ERROR]: "Error",
            [Status.RECORDING]: "Capturing Audio Sample",
            [Status.PROCESSING]: "Calculating Beats",
            [Status.DONE]: " Approximately:",
          }[status]
        }
      </Label>
      {status === Status.DONE && (
        <Result
          bpm={result}
          onComplete={() => setStatus(Status.IDLE)}
          onRetry={guessBPM}
          onSave={() =>
            Alert.prompt("Name The New Item", undefined, [
              {
                text: "Save",
                onPress: (label) => {
                  setStatus(Status.IDLE);
                  dispatch(
                    addRecord({
                      bpm: result,
                      id: nanoid(),
                      label: label!,
                      timestamp: getUnixTime(new Date()),
                    })
                  );
                },
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        />
      )}
    </Wrapper>
  );
};

export default Recorder;
