import { FC } from "react";
import { State, useAppState } from "../../../Context";
import {
  Button,
  Wrapper,
  Label,
  Title,
  Subtitle,
  TextGroup,
} from "./Result.styles";

type ResultProps = {
  bpm?: number
};

const Result: FC<ResultProps> = ({ bpm = 0 }) => {
  const { setStatus } = useAppState();

  const updateState = (nextState: State) => () => setStatus(nextState);

  return (
    <Wrapper>
      <TextGroup>
        <Title>{bpm}</Title>
        <Subtitle>BPM</Subtitle>
      </TextGroup>
      <Button onPress={updateState(State.IDLE)}>
        <Label>Done</Label>
      </Button>
      <Button onPress={updateState(State.RECORDING)}>
        <Label>Retry</Label>
      </Button>
    </Wrapper>
  );
};

export default Result;
