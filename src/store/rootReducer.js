import { combineReducers } from 'redux'
import { RoomBookingReducer } from './slice'

export const rootReducer = combineReducers({
  RoomBooking: RoomBookingReducer,
})
