import { Provider } from 'react-redux'
import { PropsWithChildren } from 'react'
import { store, persistor } from '@/store'
import ThemeProvider from '@/themes/Provider'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const AppProvider = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {children}
          </GestureHandlerRootView>
        </ThemeProvider>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
)

export default AppProvider
