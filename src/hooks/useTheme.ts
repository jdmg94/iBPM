import { light, dark } from "@/themes";
import { useColorScheme } from "react-native";
import { useSelector } from "./useSelector";

export const useTheme = () => {
  const systemTheme = useColorScheme();
  const theme = useSelector(state => state.Settings.theme);

  if (theme === "system") {
    return systemTheme === 'dark' ? dark : light;
  }

  if (theme === "light") {
    return light;
  }

  return dark;
}