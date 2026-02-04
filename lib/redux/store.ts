import { configureStore } from '@reduxjs/toolkit'
import ambulancesReducer from './slices/ambulancesSlice'
import incidentsReducer from './slices/incidentsSlice'
import dispatchReducer from './slices/dispatchSlice'

export const store = configureStore({
  reducer: {
    ambulances: ambulancesReducer,
    incidents: incidentsReducer,
    dispatch: dispatchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
