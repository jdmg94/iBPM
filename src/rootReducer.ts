import { combineReducers } from '@reduxjs/toolkit'
import { reducer as Recorder } from './sections/Recorder'
import { reducer as History } from './sections/History'
import { reducer as Settings } from './sections/Settings'

export default combineReducers({
  Recorder,
  History,
  Settings,
})