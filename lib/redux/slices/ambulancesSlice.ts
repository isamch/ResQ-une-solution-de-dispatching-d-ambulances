import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AmbulanceLocation {
  lat: number
  lng: number
}

export type AmbulanceStatus = 'Available' | 'Busy' | 'Maintenance'

export interface Ambulance {
  id: string
  callSign: string
  status: AmbulanceStatus
  location: AmbulanceLocation
  crew: string[]
  equipment: string[]
  responseTime?: number
  incidents: number
}

interface AmbulancesState {
  ambulances: Ambulance[]
  loading: boolean
  filter: AmbulanceStatus | 'All'
}

const initialState: AmbulancesState = {
  ambulances: [],
  loading: false,
  filter: 'All',
}

const ambulancesSlice = createSlice({
  name: 'ambulances',
  initialState,
  reducers: {
    setAmbulances: (state, action: PayloadAction<Ambulance[]>) => {
      state.ambulances = action.payload
    },
    updateAmbulance: (state, action: PayloadAction<Ambulance>) => {
      const index = state.ambulances.findIndex(a => a.id === action.payload.id)
      if (index !== -1) {
        state.ambulances[index] = action.payload
      }
    },
    updateAmbulanceLocation: (
      state,
      action: PayloadAction<{ id: string; location: AmbulanceLocation }>
    ) => {
      const ambulance = state.ambulances.find(a => a.id === action.payload.id)
      if (ambulance) {
        ambulance.location = action.payload.location
      }
    },
    updateAmbulanceStatus: (
      state,
      action: PayloadAction<{ id: string; status: AmbulanceStatus }>
    ) => {
      const ambulance = state.ambulances.find(a => a.id === action.payload.id)
      if (ambulance) {
        ambulance.status = action.payload.status
      }
    },
    addAmbulance: (state, action: PayloadAction<Ambulance>) => {
      state.ambulances.push(action.payload)
    },
    removeAmbulance: (state, action: PayloadAction<string>) => {
      state.ambulances = state.ambulances.filter(a => a.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setFilter: (state, action: PayloadAction<AmbulanceStatus | 'All'>) => {
      state.filter = action.payload
    },
  },
})

export const {
  setAmbulances,
  updateAmbulance,
  updateAmbulanceLocation,
  updateAmbulanceStatus,
  addAmbulance,
  removeAmbulance,
  setLoading,
  setFilter,
} = ambulancesSlice.actions

export default ambulancesSlice.reducer
