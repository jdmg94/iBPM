import { FC, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  Wrapper,
  Title,
  Detail,
  Label,
  Sublabel,
  Actions,
  ActionItem,
} from "./Item.styles";

export type BPMRecord = {
  id: string;
  label: string;
  bpm: number;
  doubleTime: number;
};

type HistoryItemProps = {
  data: BPMRecord;
  onRemove?: () => void;
  onEdit?: (updates: Partial<BPMRecord>) => void;
};

const HistoryItem: FC<HistoryItemProps> = ({ data, onRemove, onEdit }) => {
  const ref = useRef<Swipeable>(null);
  const closeRow = () => ref.current?.close();

  return (
    <Swipeable
      ref={ref}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={(progress) => {
        const animation = {
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [160, 0],
              }),
            },
          ],
        };

        return (
          <Actions>
            <ActionItem
              color="#d3a15f"
              style={animation}
              onPress={() => {
                onEdit?.();
                closeRow();
              }}
            >
              <Label color="#FFF">Edit</Label>
            </ActionItem>
            <ActionItem
              color="#c1121f"
              style={animation}
              onPress={() => {
                onRemove?.();
                closeRow();
              }}
            >
              <Label color="#FFF">Delete</Label>
            </ActionItem>
          </Actions>
        );
      }}
    >
      <Wrapper>
        <Title>{data.label}</Title>
        <Detail>
          <Label>{data.bpm}</Label>
          <Sublabel>BPM</Sublabel>
        </Detail>
      </Wrapper>
    </Swipeable>
  );
};

export default HistoryItem;
