import { router } from "expo-router";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "@/hooks";
import { Feather as Icon } from "@expo/vector-icons";
import { RangeSlider } from "@react-native-assets/slider";
import { Switch, Keyboard, TouchableWithoutFeedback } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  Title,
  Label,
  Span,
  Subtext,
  Row,
  Input,
  Container,
} from "./Settings.styles";
import {
  setTheme,
  setMinBpm,
  setMaxBpm,
  setDuration,
  setRecordingQuality,
} from "./Settings.slice";

const Settings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const segments = ["Light", "Dark", "System"];
  const maxBPM = useSelector((state) => state.Settings.maxBpm);
  const minBPM = useSelector((state) => state.Settings.minBpm);
  const themePref = useSelector((state) => state.Settings.theme);
  const duration = useSelector((state) => state.Settings.duration);
  const recordingQuality = useSelector(
    (state) => state.Settings.recordingQuality
  );
  const [durationBuffer, setDurationBuffer] = useState(`${duration}`);

  useEffect(() => {
    if (durationBuffer.length > 0) {
      const parsedValue = parseInt(durationBuffer, 10);
      if (parsedValue > 0 && parsedValue !== duration) {
        dispatch(setDuration(parsedValue));
      } else if (durationBuffer.length === 1) {
        dispatch(setDuration(0));
      }
    } else {
      dispatch(setDuration(0));
    }
  }, [durationBuffer]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Row justifyContent="flex-start">
          <Icon
            size={32}
            name="arrow-left"
            onPress={router.back}
            color={theme.colors.text}
          />
          <Title>Settings</Title>
        </Row>
        <Row justifyContent="space-between">
          <Label>Theme:</Label>
          <SegmentedControl
            values={segments}
            style={{ width: "60%" }}
            tintColor={theme.colors.segmentedControlAccent}
            selectedIndex={
              {
                light: 0,
                dark: 1,
                system: 2,
              }[themePref]
            }
            onChange={(evt) => {
              const selectedIndex = evt.nativeEvent.selectedSegmentIndex;
              const nextValue = segments[selectedIndex]?.toLowerCase();
              dispatch(setTheme(nextValue));
            }}
          />
        </Row>
        <Row justifyContent="space-between">
          <Label>High Quality Recording:</Label>
          <Switch
            value={recordingQuality === "high"}
            onValueChange={(value) => {
              dispatch(setRecordingQuality(value ? "high" : "low"));
              if (Keyboard.isVisible()) {
                Keyboard.dismiss();
              }
            }}
          />
        </Row>
        <Row justifyContent="space-between">
          <Label>Duration:</Label>
          <Row>
            <Input
              width={80}
              textAlign="right"
              keyboardType="numeric"
              value={durationBuffer}
              onChangeText={(value: string) => {
                setDurationBuffer(value);
              }}
            />
            <Span marginLeft={2}>ms</Span>
          </Row>
        </Row>
        <Row justifyContent="space-between">
          <Label>Detection Range:</Label>
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
          thumbSize={18}
          range={[80, 160]}
          minimumValue={60}
          maximumValue={215}
          style={{ marginHorizontal: 16 }}
          outboundColor={theme.colors.accent}
          inboundColor={theme.colors.segmentedControlAccent}
          thumbTintColor={theme.colors.segmentedControlAccent}
          onValueChange={([nextMin, nextMax]) => {
            if (nextMin !== minBPM) {
              dispatch(setMinBpm(nextMin));
            }
            if (nextMax !== maxBPM) {
              dispatch(setMaxBpm(nextMax));
            }
          }}
        />
        <Subtext marginTop={16}>
          <Span fontWeight="bold">Warning: </Span>Be careful, the more value of
          maximum BPM, the more probability of 2x-BPM errors (e.g. if max BPM =
          210 and real tempo of a song 102 BPM, in the end you can get 204 BPM).
        </Subtext>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Settings;
