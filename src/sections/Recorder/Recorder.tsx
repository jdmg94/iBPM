import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Wrapper } from "./Recorder.styles";

const Recorder = () => {
  const verticalDrag = Gesture.Pan()
  return (
    <GestureDetector>
      <Wrapper />
    </GestureDetector>
  );
};

export default Recorder;
