import { format } from "date-fns";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "@/hooks";
import { PanGestureHandler } from "react-native-gesture-handler";

import Result from "./Result";
import { addRecord } from "../History";
import { useInteraction } from "./useInterations";
import { RecordingLoader, ProcessingLoader } from "./Loaders";
import {
  updateStatus,
  captureRecording,
  RecorderStatus as Status,
} from "./Recorder.slice";
import {
  Label,
  Handle,
  Wrapper,
  Button,
  ButtonOutline,
} from "./Recorder.styles";

const Recorder = () => {
  const result = useSelector((state) => state.Recorder.data);
  const status = useSelector((state) => state.Recorder.status);
  const duration = useSelector((state) => state.Settings.duration);

  const dispatch = useDispatch();
  const { animation, verticalDrag } = useInteraction(status);
  const addToHistory = () =>
    Alert.prompt(
      "Save as",
      undefined,
      [
        {
          text: "Save",
          onPress: (label) => {
            if (!label || label.length == 0) {
              addToHistory();
            } else if (result) {
              dispatch(updateStatus(Status.IDLE));
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
      ],
      "plain-text",
      format(new Date(), "Pp")
    );

  return (
    <Wrapper style={animation}>
      {status === Status.DONE && (
        <PanGestureHandler onGestureEvent={verticalDrag}>
          <Handle hitSlop={{ top: 20, bottom: 50, left: 150, right: 150 }} />
        </PanGestureHandler>
      )}
      {status === Status.IDLE && (
        <ButtonOutline>
          <Button onPress={() => dispatch(captureRecording())} />
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
          onSave={addToHistory}
          onRetry={() => dispatch(captureRecording())}
          onComplete={() => dispatch(updateStatus(Status.IDLE))}
        />
      )}
    </Wrapper>
  );
};

export default Recorder;
