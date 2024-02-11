import { Link } from 'expo-router'
import { useTheme } from '@/hooks'
import { FlatList } from 'react-native'
import Header from '@/components/Header'
import { BPMRecord } from '@/sections/History'
import { useDispatch, useSelector } from '@/hooks'
import { Feather as Icon } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import ListEmpty from './ListEmpty'
import Item, { Separator } from './Item'
import { updateRecord, removeRecord } from './History.slice'

const History = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()
  const data = useSelector((state) => state.History.data)
  const deleteItem = (id: string) => () => dispatch(removeRecord(id))
  const editItem = (id: string) => (updates: Partial<BPMRecord>) =>
    dispatch(updateRecord({ id, updates }))

  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={<ListEmpty />}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Separator />}
      ListHeaderComponentStyle={{ height: 68, padding: 8 }}
      contentContainerStyle={{ paddingBottom: 230 }}
      ListHeaderComponent={
        <Header
          title="All Records"
          right={
            <Link href="/settings">
              <Icon size={24} name="settings" color={theme.colors.text} />
            </Link>
          }
        />
      }
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
  )
}

export default History
