import { useTheme } from "@/hooks";
import { FlatList } from "react-native";
import { BPMRecord } from "@/sections/History";
import { useDispatch, useSelector } from "@/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "./Header";
import ListEmpty from "./ListEmpty";
import Item, { Separator } from "./Item";
import { updateRecord, removeRecord } from "./History.slice";

const History = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const data = useSelector((state) => state.History.data);
  const deleteItem = (id: string) => () => dispatch(removeRecord(id));
  const editItem = (id: string) => (updates: Partial<BPMRecord>) =>
    dispatch(updateRecord({ id, updates }));

  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<Header />}
      ListEmptyComponent={<ListEmpty />}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Separator />}
      ListHeaderComponentStyle={{ height: 68 }}
      contentContainerStyle={{ paddingBottom: 230 }}
      renderItem={({ item }) => (
        <Item
          data={item}
          onEdit={editItem(item.id)}
          onRemove={deleteItem(item.id)}
        />
      )}
      style={{
        paddingTop: insets.top,
        backgroundColor: theme.colors.background,
      }}
    />
  );
};

export default History;
