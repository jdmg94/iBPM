import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item, { BPMRecord, Separator } from "./Item";

const data: BPMRecord[] = [
  { id: "1", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  { id: "2", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  { id: "3", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  { id: "4", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
];

const History = () => {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={data}
      renderItem={Item}
      keyExtractor={({ id }) => id}
      style={{ marginTop: insets.top }}
      ItemSeparatorComponent={Separator}
    />
  );
};

export default History;
