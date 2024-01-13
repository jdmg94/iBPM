import { format, getUnixTime } from 'date-fns';
import { getReadableId } from "@/utils/human-id";
import type { BPMRecord } from "@/sections/History";
import { SettingsState } from "@/sections/Settings";
import { documentDirectory, moveAsync } from "expo-file-system";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  prepareToRecord,
  determineBPM,
  captureAudioSample,
} from "@/AudioService";

export enum RecorderStatus {
  IDLE,
  RECORDING,
  PROCESSING,
  DONE,
  ERROR,
}

export type RecorderState = {
  status: RecorderStatus;
  data?: BPMRecord;
}

const initialState: RecorderState = {
  data: undefined,
  status: RecorderStatus.IDLE,
}

export const recorderSlice = createSlice({
  name: "Recorder",
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<RecorderStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => builder
    .addCase(captureRecording.fulfilled, (state, action) => {
      state.data = action.payload;
    })
});

export const { updateStatus } = recorderSlice.actions;
export default recorderSlice.reducer;

export const captureRecording = createAsyncThunk<
  BPMRecord,
  void,
  {
    state: {
      Settings: SettingsState
    }
  }
>('Recorder/capture', async (_, { getState, dispatch }) => {
  await prepareToRecord();
  const id = getReadableId();
  const { duration } = getState().Settings;
  const to = `${documentDirectory}recordings/${id}.m4a`;

  dispatch(updateStatus(RecorderStatus.RECORDING));
  const { uri, sound } = await captureAudioSample(duration);
  dispatch(updateStatus(RecorderStatus.PROCESSING));

  // optimistically move, don't await
  moveAsync({
    from: uri,
    to,
  });
  const tempo = await determineBPM(sound);
  dispatch(updateStatus(RecorderStatus.DONE));

  const now = new Date()
  const label = format(now, 'Pp');
  const timestamp = getUnixTime(now);

  return {
    id,
    label,
    uri: to,
    timestamp,
    bpm: tempo,
  };
});