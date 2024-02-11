import { Audio } from "expo-av";
import { useTheme } from "@/hooks";
import { Alert } from "react-native";
import { Span, Label, Subtext } from "@/components/Text";
import { BPMRecord } from "@/sections/History";
import { prepareToPlay } from "@/AudioService";
import { Feather as Icon } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { FC, useRef, useState, useEffect, useCallback } from "react";

import ActionItem from "./Action";
import { Detail, Column, Wrapper } from "./Item.styles";

type HistoryItemProps = {
  data: BPMRecord;
  onRemove: () => void;
  onEdit: (updates: Partial<BPMRecord>) => void;
};

enum PlayStatus {
  ERROR,
  PAUSED,
  PLAYING,
  STOPPED,
}

const HistoryItem: FC<HistoryItemProps> = ({ data, onRemove, onEdit }) => {
  const theme = useTheme();
  const ref = useRef<Swipeable>(null);
  const closeRow = () => ref.current?.close();
  const [sample, setSample] = useState<Audio.Sound>();
  const [status, updateStatus] = useState<PlayStatus>(PlayStatus.STOPPED);

  const disposeSound = () => {
    sample?.unloadAsync().then(() => {
      setSample(undefined);
    });
  };

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
    }
  }, [status, sample]);

  return (
    <Swipeable
      ref={ref}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      onSwipeableWillOpen={initializeSound}
      onSwipeableWillClose={disposeSound}
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
              style={animation}
              color={theme.colors.delete}
              label={<Icon name="trash-2" size={24} color="#FFF" />}
              onPress={() => {
                closeRow();
                setTimeout(onRemove, 350);
              }}
            />
            <ActionItem
              style={animation}
              color={theme.colors.info}
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
              style={animation}
              color={theme.colors.success}
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
                }
                if (status === PlayStatus.PAUSED) {
                  prepareToPlay().then(() => {
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
          <Label>{data.label}</Label>
          <Subtext>
            {formatDistanceToNow(fromUnixTime(data.timestamp))} ago
          </Subtext>
        </Column>
        <Detail>
          <Span fontSize={16}>{data.bpm}</Span>
          <Span fontSize={14} fontWeight="bold">
            BPM
          </Span>
        </Detail>
      </Wrapper>
    </Swipeable>
  );
};

export default HistoryItem;
