import { router } from 'expo-router'
import Header from '@/components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import { Span, Subtext, Label } from '@/components/Text'
import { useDispatch, useSelector, useTheme } from '@/hooks'
import { RangeSlider, Slider } from '@react-native-assets/slider'
import { Switch, Keyboard, TouchableWithoutFeedback } from 'react-native'
import SegmentedControl from '@react-native-segmented-control/segmented-control'

import NumberInput from './NumberInput'
import { Row, Input, Container, Endpiece } from './Settings.styles'
import {
  setTheme,
  setMinBpm,
  setMaxBpm,
  setDuration,
  setRecordingQuality,
} from './Settings.slice'

const Settings = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const segments = ['Light', 'Dark', 'System']
  const maxBPM = useSelector((state) => state.Settings.maxBpm)
  const minBPM = useSelector((state) => state.Settings.minBpm)
  const themePref = useSelector((state) => state.Settings.theme)
  const duration = useSelector((state) => state.Settings.duration)
  const recordingQuality = useSelector(
    (state) => state.Settings.recordingQuality,
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header
          title="Settings"
          style={{ marginBottom: 16 }}
          left={
            <Icon
              size={32}
              name="arrow-left"
              onPress={router.back}
              color={theme.colors.text}
            />
          }
        />
        <Row justifyContent="space-between">
          <Label>Theme:</Label>
          <SegmentedControl
            values={segments}
            style={{ width: '60%' }}
            tintColor={theme.colors.segmentedControlAccent}
            selectedIndex={
              {
                light: 0,
                dark: 1,
                system: 2,
              }[themePref] ?? 2
            }
            onChange={(evt) => {
              const selectedIndex = evt.nativeEvent.selectedSegmentIndex
              const nextValue = segments[selectedIndex]?.toLowerCase()
              dispatch(setTheme(nextValue))
            }}
          />
        </Row>
        <Row justifyContent="space-between">
          <Label>High Quality Recording:</Label>
          <Switch
            value={recordingQuality === 'high'}
            onValueChange={(value) => {
              dispatch(setRecordingQuality(value ? 'high' : 'low'))
              if (Keyboard.isVisible()) {
                Keyboard.dismiss()
              }
            }}
          />
        </Row>
        <Row justifyContent="space-between">
          <Label>Duration:</Label>
          <Row>
            <NumberInput
              value={duration}
              onChange={(value) => {
                if (value >= 3000 && value <= 8000) {
                  dispatch(setDuration(value))
                } else {
                  dispatch(setDuration(duration))
                }
              }}
            />
            <Span marginLeft={2}>ms</Span>
          </Row>
        </Row>
        <Slider
          step={100}
          thumbSize={20}
          value={duration}
          minimumValue={3000}
          maximumValue={8000}
          style={{ marginHorizontal: 16 }}
          maximumTrackTintColor={theme.colors.accent}
          thumbTintColor={theme.colors.segmentedControlAccent}
          minimumTrackTintColor={theme.colors.segmentedControlAccent}
          onValueChange={(nextValue) => dispatch(setDuration(nextValue))}
        />
        <Row justifyContent="space-between">
          <Label>Dynamic Range:</Label>
          <Row>
            <Input
              editable={false}
              textAlign="center"
              value={`${minBPM}`}
              keyboardType="numeric"
            />
            <Span marginRight={2} marginLeft={2}>
              to
            </Span>
            <Input
              width={60}
              editable={false}
              textAlign="center"
              value={`${maxBPM}`}
              keyboardType="numeric"
            />
          </Row>
        </Row>
        <RangeSlider
          step={1}
          thumbSize={20}
          minimumValue={60}
          maximumValue={215}
          range={[minBPM, maxBPM]}
          style={{ marginHorizontal: 16 }}
          outboundColor={theme.colors.accent}
          inboundColor={theme.colors.segmentedControlAccent}
          thumbTintColor={theme.colors.segmentedControlAccent}
          onValueChange={([nextMin, nextMax]) => {
            if (nextMin !== minBPM) {
              dispatch(setMinBpm(nextMin))
            }
            if (nextMax !== maxBPM) {
              dispatch(setMaxBpm(nextMax))
            }
          }}
        />
        <Subtext marginTop={16}>
          <Span fontWeight="bold">Warning: </Span> the more value of maximum
          BPM, the more probability of 2x-BPM errors (e.g. if max BPM = 210 and
          real tempo of a song 102 BPM, in the end you can get 204 BPM).
        </Subtext>
        <Endpiece>
          <Span fontSize={24}>
            🇭🇳
          </Span>
        </Endpiece>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default Settings
