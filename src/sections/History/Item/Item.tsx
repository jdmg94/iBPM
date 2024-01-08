import { FC, useRef } from "react";
import { Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { formatRelative, formatDistanceToNow, fromUnixTime } from "date-fns";

import {
  Wrapper,
  Title,
  Subtitle,
  Detail,
  Column,
  Label,
  Sublabel,
} from "./Item.styles";
import ActionItem from "./Action";

export type BPMRecord = {
  id: string;
  label: string;
  bpm: number;
  timestamp: number;
};

type HistoryItemProps = {
  data: BPMRecord;
  onRemove: () => void;
  onEdit: (updates: Partial<BPMRecord>) => void;
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
          <>
            <ActionItem
              label="Delete"
              color="#c1121f"
              style={animation}
              onPress={() => {
                closeRow();
                setTimeout(onRemove, 350);
              }}
            />
            <ActionItem
              color="#08F"
              label="Rename"
              style={animation}
              onPress={() => {
                Alert.prompt(
                  "Rename",
                  undefined,
                  [
                    {
                      text: "Save",
                      onPress: (label) => {
                        onEdit({ label });
                        closeRow();
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                      onPress: () => closeRow(),
                    },
                  ],
                  undefined,
                  data.label
                );
              }}
            />
          </>
        );
      }}
    >
      <Wrapper>
        <Column>
          <Title>{data.label}</Title>
          <Subtitle>
						{formatDistanceToNow(fromUnixTime(data.timestamp))}
          </Subtitle>
        </Column>
        <Detail>
          <Label>{data.bpm}</Label>
          <Sublabel>BPM</Sublabel>
        </Detail>
      </Wrapper>
    </Swipeable>
  );
};

export default HistoryItem;
