import { Audio } from "expo-av";
import { Alert } from "react-native";
import { BPMRecord } from "@/sections/History";
import { prepareToPlay } from "@/AudioService";
import { Feather as Icon } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { FC, useRef, useState, useEffect, useCallback } from "react";

import ActionItem from "./Action";
import {
  Wrapper,
  Title,
  Subtitle,
  Detail,
  Column,
  Label,
  Sublabel,
} from "./Item.styles";

type HistoryItemProps = {
  data: BPMRecord;
  onRemove: () => void;
  onEdit: (updates: Partial<BPMRecord>) => void;
};

enum PlayStatus {
  STOPPED,
  PLAYING,
  PAUSED,
  ERROR,
}

const HistoryItem: FC<HistoryItemProps> = ({ data, onRemove, onEdit }) => {
  const ref = useRef<Swipeable>(null);
  const closeRow = () => ref.current?.close();
  const [sample, setSample] = useState<Audio.Sound>();
  const [status, updateStatus] = useState<PlayStatus>(PlayStatus.STOPPED);

  const initializeSound = useCallback(async function () {
    const buffer = await Audio.Sound.createAsync(
      { uri: data.uri },
      {
        shouldPlay: false,
        isMuted: false,
        volume: 1.0,
      },
      (statusUpdate) => {
        if (!statusUpdate.isLoaded) {
          if (statusUpdate.error) {
            updateStatus(PlayStatus.ERROR);
          }
        } else {
          if (statusUpdate.isPlaying) {
            updateStatus(PlayStatus.PLAYING);
          } else if (!statusUpdate.didJustFinish) {
            updateStatus(PlayStatus.PAUSED);
          } else {
            updateStatus(PlayStatus.STOPPED);
          }
        }
      }
    );

    setSample(buffer.sound);
  }, []);

  useEffect(() => {
    if (sample && status === PlayStatus.STOPPED) {
      closeRow();
      sample.unloadAsync().then(() => {
        setSample(undefined);
      });
    }
  }, [status, sample]);

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
                outputRange: [240, 0],
              }),
            },
          ],
        };

        return (
          <>
            <ActionItem
              color="#ff5964"
              style={animation}
              label={<Icon name="trash-2" size={24} color="#FFF" />}
              onPress={() => {
                closeRow();
                setTimeout(onRemove, 350);
              }}
            />
            <ActionItem
              color="#35a7ff"
              style={animation}
              label={<Icon name="edit-3" size={24} color="#FFF" />}
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
            <ActionItem
              color="#6bf178"
              style={animation}
              label={
                <Icon
                  size={24}
                  color="#FFF"
                  name={status === PlayStatus.PLAYING ? "pause" : "play"}
                />
              }
              onPress={() => {
                if (status === PlayStatus.PLAYING) {
                  sample?.pauseAsync();
                } else {
                  prepareToPlay()
                    .then(initializeSound)
                    .then(() => {
                      sample?.playAsync();
                    });
                }
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
            {formatDistanceToNow(fromUnixTime(data.timestamp))} ago
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
