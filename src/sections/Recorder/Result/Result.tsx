import { FC } from 'react'
import { Span } from '@/components/Text'
import { Button, Wrapper, TextGroup } from './Result.styles'

type ResultProps = {
  bpm?: number
  onComplete: () => void
  onRetry: () => void
  onSave: () => void
}

const Result: FC<ResultProps> = ({ bpm = 0, onComplete, onRetry, onSave }) => (
  <Wrapper>
    <TextGroup>
      <Span fontWeight={200} fontSize={80}>
        {bpm}
      </Span>
      <Span fontWeight="bold" fontSize={64}>
        BPM
      </Span>
    </TextGroup>
    <Button onPress={onSave}>
      <Span>Save</Span>
    </Button>
    <Button onPress={onRetry}>
      <Span>Retry</Span>
    </Button>
    <Button onPress={onComplete}>
      <Span>Done</Span>
    </Button>
  </Wrapper>
)

export default Result
