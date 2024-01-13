import { documentDirectory, deleteAsync } from "expo-file-system";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type BPMRecord = {
  id: string;
  bpm: number;
  uri: string;
  label: string;
  timestamp: number;
};

export type HistoryState = {
	data: BPMRecord[];
};

const initialState: HistoryState = {
	data: [],
};

const History = createSlice({
	name: 'History',
	initialState,
	reducers: {
		addRecord: (state: HistoryState, action: PayloadAction<BPMRecord>) => {
			state.data.unshift(action.payload);
		},
		updateRecord: (
			state: HistoryState,
			action: PayloadAction<{ id: string; updates: Partial<BPMRecord> }>,
		) => {
			const index = state.data.findIndex(item => item.id === action.payload.id);

			if (index > -1) {
				state.data[index] = {
					...state.data[index],
					...action.payload.updates,
					id: action.payload.id,
				};
			}
		},
	},
	extraReducers: (builder) => builder
		.addCase(removeRecord.fulfilled, (state, action) => {
			state.data = state.data.filter(item => item.id !== action.payload);
		})
});

export const { addRecord, updateRecord } = History.actions;

export default History.reducer;

export const removeRecord = createAsyncThunk<string, string>('History/removeRecord', async (id) => {
	const fileLocation = `${documentDirectory}recordings/${id}.m4a`;

	await deleteAsync(fileLocation);

	return id;
});