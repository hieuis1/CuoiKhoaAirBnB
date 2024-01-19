import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chairsBooking: [],
  chairsBooked: [],
}

export const RoomBookingSlice = createSlice({
  name: 'RoomBooking',
  initialState,
  reducers: {
    setChairsBooking: (state, { payload }) => {
      const index = state.chairsBooking.findIndex(
        (value) => value.maGhe === payload.maGhe
      )

      if (index !== -1) {
        state.chairsBooking = state.chairsBooking.filter(
          (value) => value.maGhe !== payload.maGhe
        )
      } else {
        state.chairsBooking = [...state.chairsBooking, payload]
      }
    },
    
    setChairsBooked: (state, { payload }) => {
      state.chairsBooked = [...state.chairsBooked, ...state.chairsBooking]
      state.chairsBooking = []
    },

    removeChairBooked: (state, { payload }) => {
      const index = state.chairsBooking.findIndex(
        (value) => value.soGhe === payload.soGhe
      )
      if (index !== -1) {
        state.chairsBooking.splice(index, 1)
      }
    },

    resetChairBooking: (state, { payload }) => {
      return {
        ...state,
        chairsBooking: [],
      }
    },

    // payment: (state, { payload }) => {
    //   console.log('payload: ', payload)
    // },
  },
})

export const { reducer: RoomBookingReducer, actions: RoomBookingActions } =
  RoomBookingSlice
