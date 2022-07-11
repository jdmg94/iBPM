import { createSlice } from '@reduxjs/toolkit'

export enum Status {
  IDLE,
  RECORDING,
  PROCESSING,
  DONE,
  ERROR,
}

const initialState = {
  status: Status.IDLE
}

const RecorderSlice = createSlice({
  name: 'Recorder',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload
    }
  },
})


export const {
  updateStatus
} = RecorderSlice.actions

export default RecorderSlice.reducer