import { FC } from "react";

import { useDispatch } from "../../../hooks";
import { Status, updateStatus } from "../Recorder.slice";
import {
  Button,
  Wrapper,
  Label,
  Title,
  Subtitle,
  TextGroup,
} from "./Result.styles";

type ResultProps = {
  bpm?: number;
};

const Result: FC<ResultProps> = ({ bpm = 0 }) => {
  const dispatch = useDispatch();

  const updateState = (nextState: Status) => () =>
    dispatch(updateStatus(nextState));

  return (
    <Wrapper>
      <TextGroup>
        <Title>{bpm}</Title>
        <Subtitle>BPM</Subtitle>
      </TextGroup>
      <Button onPress={updateState(Status.IDLE)}>
        <Label>Done</Label>
      </Button>
      <Button onPress={updateState(Status.RECORDING)}>
        <Label>Retry</Label>
      </Button>
    </Wrapper>
  );
};

export default Result;
