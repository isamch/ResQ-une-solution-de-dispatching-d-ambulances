import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical'
export type IncidentStatus = 'Pending' | 'In Progress' | 'Completed'

export interface IncidentLocation {
  lat: number
  lng: number
  address: string
}

export interface Incident {
  id: string
  address: string
  location: IncidentLocation
  patient: string
  severity: IncidentSeverity
  status: IncidentStatus
  assignedAmbulance?: string
  createdAt: string
  completedAt?: string
  notes?: string
}

interface IncidentsState {
  incidents: Incident[]
  selectedIncident?: Incident
  loading: boolean
}

const initialState: IncidentsState = {
  incidents: [],
  loading: false,
}

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setIncidents: (state, action: PayloadAction<Incident[]>) => {
      state.incidents = action.payload
    },
    createIncident: (state, action: PayloadAction<Incident>) => {
      state.incidents.push(action.payload)
    },
    updateIncident: (state, action: PayloadAction<Incident>) => {
      const index = state.incidents.findIndex(i => i.id === action.payload.id)
      if (index !== -1) {
        state.incidents[index] = action.payload
      }
    },
    updateIncidentStatus: (
      state,
      action: PayloadAction<{ id: string; status: IncidentStatus }>
    ) => {
      const incident = state.incidents.find(i => i.id === action.payload.id)
      if (incident) {
        incident.status = action.payload.status
        if (action.payload.status === 'Completed') {
          incident.completedAt = new Date().toISOString()
        }
      }
    },
    assignAmbulance: (
      state,
      action: PayloadAction<{ incidentId: string; ambulanceId: string }>
    ) => {
      const incident = state.incidents.find(i => i.id === action.payload.incidentId)
      if (incident) {
        incident.assignedAmbulance = action.payload.ambulanceId
      }
    },
    selectIncident: (state, action: PayloadAction<Incident | undefined>) => {
      state.selectedIncident = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const {
  setIncidents,
  createIncident,
  updateIncident,
  updateIncidentStatus,
  assignAmbulance,
  selectIncident,
  setLoading,
} = incidentsSlice.actions

export default incidentsSlice.reducer
