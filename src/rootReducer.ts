import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducer as History } from './sections/History';
import { reducer as Settings } from './sections/Settings';

export default persistReducer(
	{
		key: 'iBPM-dev',
		storage: AsyncStorage,
	},
	combineReducers({
		History,
		Settings,
	}),
);
