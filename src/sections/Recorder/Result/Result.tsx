import { FC } from "react";
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
  onComplete: () => void;
  onRetry: () => void;
  onSave: () => void;
};

const Result: FC<ResultProps> = ({ bpm = 0, onComplete, onRetry, onSave }) => (
  <Wrapper>
    <TextGroup>
      <Title>{bpm}</Title>
      <Subtitle>BPM</Subtitle>
    </TextGroup>
    <Button onPress={onSave}>
      <Label>Save</Label>
    </Button>
    <Button onPress={onRetry}>
      <Label>Retry</Label>
    </Button>
    <Button onPress={onComplete}>
      <Label>Done</Label>
    </Button>
  </Wrapper>
);

export default Result;
