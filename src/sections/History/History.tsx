import { FlatList, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item, { BPMRecord, Separator } from "./Item";

const data: BPMRecord[] = [
  { id: "1", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, timestamp: 250 },
  // { id: "2", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "3", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "4", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "5", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "6", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "7", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "8", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "9", label: "2022-06-28, 4:17:35 a.m.", bpm: 125, doubleTime: 250 },
  // { id: "10", label: "Last One!", bpm: 100, doubleTime: 200 },
];


const History = () => {
  const insets = useSafeAreaInsets();
  const deleteItem = (id: string) => () => {
    Alert.alert("delete", id);
  };

  const editItem = (id: string) => (updates: Partial<BPMRecord>) => {
    Alert.alert("edit", id);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      style={{ marginTop: insets.top }}
      contentContainerStyle={{ paddingBottom: 150 }}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => (
        <Item
          data={item}
          onEdit={editItem(item.id)}
          onRemove={deleteItem(item.id)}
        />
      )}
    />
  );
};

export default History;
