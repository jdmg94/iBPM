import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BPMRecord = {
	id: string;
	label: string;
	bpm: number;
	timestamp: number;
};

type HistoryState = {
	data: BPMRecord[];
};

const initialState: HistoryState = {
	data: [
		{
			id: '1',
			label: '2022-06-28, 4:17:35 a.m.',
			bpm: 125,
			timestamp: 1656374400,
		},
	],
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
		deleteRecord: (state: HistoryState, action: PayloadAction<string>) => {
			state.data = state.data.filter(item => item.id !== action.payload);
		},
	},
});

export const { addRecord, updateRecord, deleteRecord } = History.actions;

export default History.reducer;
