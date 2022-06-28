import { FC } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Wrapper, Title, Detail, Label, Sublabel } from "./Item.styles";

export type BPMRecord = {
  id: string;
  label: string;
  bpm: number;
  doubleTime: number;
};

const HistoryItem: FC<{ item: BPMRecord }> = ({ item }) => {

  return (
    <Swipeable>
      <Wrapper>
        <Title>{item.label}</Title>
        <Detail>
          <Label>
            {item.bpm}
          </Label>
          <Sublabel>
            BPM
          </Sublabel>
        </Detail>
      </Wrapper>
    </Swipeable>
  );
};

export default HistoryItem;
