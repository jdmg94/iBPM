import { FC } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store, persistor } from "./store";

const AppProvider: FC = ({ children }) => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  </SafeAreaProvider>
);

export default AppProvider;
