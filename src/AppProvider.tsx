import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { useColorScheme } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import dark from "./themes/dark";
import light from "./themes/light";
import { store, persistor } from "./store";

const AppProvider = ({ children }: PropsWithChildren) => {
  const theme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme === "light" ? light : dark}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {children}
            </GestureHandlerRootView>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
