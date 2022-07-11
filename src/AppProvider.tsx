import { FC } from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./store";

const AppProvider: FC = ({ children }) => (
  <SafeAreaProvider>
    <Provider store={store}>{children}</Provider>
  </SafeAreaProvider>
);

export default AppProvider;
