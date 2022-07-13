import { FC } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { useColorScheme } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import dark from "./themes/dark";
import light from "./themes/light";
import { store, persistor } from "./store";

const AppProvider: FC = ({ children }) => {
  const theme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme === "light" ? light : dark}>
            {children}
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
