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
};

const Result: FC<ResultProps> = ({ bpm = 0, onComplete, onRetry }) => (
  <Wrapper>
    <TextGroup>
      <Title>{bpm}</Title>
      <Subtitle>BPM</Subtitle>
    </TextGroup>
    <Button onPress={onComplete}>
      <Label>Done</Label>
    </Button>
    <Button onPress={onRetry}>
      <Label>Retry</Label>
    </Button>
  </Wrapper>
);

export default Result;
