import { Alert, Dimensions } from 'react-native'
import { Span } from '@/components/Text'
import { useState, useEffect } from 'react'
import { getReadableId } from '@/utils/human-id'
import { useDispatch, useSelector } from '@/hooks'
import { PanGestureHandler } from 'react-native-gesture-handler'

import Result from './Result'
import { addRecord } from '../History'
import { useInteraction } from './useInterations'
import { RecordingLoader, ProcessingLoader } from './Loaders'
import {
  updateStatus,
  captureRecording,
  RecorderStatus as Status,
} from './Recorder.slice'
import { Handle, Wrapper, Button, ButtonOutline } from './Recorder.styles'

const Recorder = () => {
  const { width } = Dimensions.get('window')
  const [id, setId] = useState(getReadableId())
  const result = useSelector((state) => state.Recorder.data)
  const status = useSelector((state) => state.Recorder.status)
  const duration = useSelector((state) => state.Settings.duration)

  const dispatch = useDispatch()
  const { animation, verticalDrag } = useInteraction(status)
  const addToHistory = () =>
    Alert.prompt(
      'Save as',
      undefined,
      [
        {
          text: 'Save',
          onPress: (label) => {
            if (!label || label.length == 0) {
              addToHistory()
            } else if (result) {
              dispatch(updateStatus(Status.IDLE))
              dispatch(
                addRecord({
                  ...result,
                  label,
                  id,
                }),
              )
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      'plain-text',
      id,
    )

  useEffect(() => {
    if (status === Status.RECORDING) {
      setId(getReadableId())
    }
  }, [status])

  return (
    <Wrapper width={width} style={animation}>
      {status === Status.DONE && (
        <PanGestureHandler onGestureEvent={verticalDrag}>
          <Handle hitSlop={{ top: 20, bottom: 50, left: 150, right: 150 }} />
        </PanGestureHandler>
      )}
      {status === Status.IDLE && (
        <ButtonOutline>
          <Button onPress={() => dispatch(captureRecording(id))} />
        </ButtonOutline>
      )}
      {status === Status.RECORDING && <RecordingLoader duration={duration} />}
      {status === Status.PROCESSING && <ProcessingLoader />}
      <Span margin={16} fontSize={20}>
        {
          {
            [Status.IDLE]: '',
            [Status.RECORDING]: 'Capturing Audio Sample',
            [Status.PROCESSING]: 'Detecting Beats',
            [Status.DONE]: ' Approximately:',
            [Status.ERROR]: 'Error',
          }[status]
        }
      </Span>
      {status === Status.DONE && (
        <Result
          bpm={result?.bpm}
          onSave={addToHistory}
          onRetry={() => dispatch(captureRecording(id))}
          onComplete={() => dispatch(updateStatus(Status.IDLE))}
        />
      )}
    </Wrapper>
  )
}

export default Recorder
