import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { reducer as History } from "./sections/History";

export default persistReducer(
  {
    key: "iBPM",
    storage: AsyncStorage,
  },
  combineReducers({
    History,
  })
);
