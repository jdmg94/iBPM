import { FlatList } from "react-native";
import { useTheme } from "@emotion/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from './Header'
import Item, { BPMRecord, Separator } from "./Item";
import { useDispatch, useSelector } from "../../hooks";
import { deleteRecord, updateRecord } from "./History.slice";

const History = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const data = useSelector((state) => state.History.data);

  const deleteItem = (id: string) => () => dispatch(deleteRecord(id));
  const editItem = (id: string) => (updates: Partial<BPMRecord>) =>
    dispatch(updateRecord({ id, updates }));

  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      style={{
        paddingTop: insets.top,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{ paddingBottom: 200 }}
      ListHeaderComponent={<Header>All Records</Header>}
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
