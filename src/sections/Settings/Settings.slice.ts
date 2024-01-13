import { createSlice } from '@reduxjs/toolkit'

export type SettingsState = {
  minBpm: number
  maxBpm: number
  duration: number
  isDarkMode: boolean
}

const initialState: SettingsState = {
  minBpm: 80,
  maxBpm: 180,
  duration: 5000,
  isDarkMode: true
};

const settingsSlice = createSlice({
  name: "Settings",
  initialState,
  reducers: {
    setMinBpm: (state, action) => {
      state.minBpm = action.payload;
    },
    setMaxBpm: (state, action) => {
      state.maxBpm = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    }
  }
});

export const {
  setMinBpm,
  setMaxBpm,
  setDuration,
  setDarkMode,
} = settingsSlice.actions;
export default settingsSlice.reducer;