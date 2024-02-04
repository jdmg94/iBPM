import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SettingsState = {
  minBpm: number
  maxBpm: number
  duration: number
  theme: 'light' | 'dark' | 'system'
  recordingQuality: 'low' | 'high'
}

const initialState: SettingsState = {
  minBpm: 80, // 60 / 0.75 = min 80bpm
  maxBpm: 160, // 60 / 0.375 = max 160bpm
  duration: 5000,
  theme: 'system',
  recordingQuality: 'high',
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
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setRecordingQuality: (state, action) => {
      state.recordingQuality = action.payload;
    }
  }
});

export const {
  setTheme,
  setMinBpm,
  setMaxBpm,
  setDuration,
  setRecordingQuality,
} = settingsSlice.actions;
export default settingsSlice.reducer;