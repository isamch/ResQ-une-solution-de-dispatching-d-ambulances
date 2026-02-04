import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DispatchAction {
  id: string
  timestamp: string
  type: 'incident_created' | 'ambulance_assigned' | 'status_updated' | 'incident_completed'
  description: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

interface DispatchState {
  actions: DispatchAction[]
  selectedAction?: DispatchAction
  viewMode: 'list' | 'map'
}

const initialState: DispatchState = {
  actions: [],
  viewMode: 'map',
}

const dispatchSlice = createSlice({
  name: 'dispatch',
  initialState,
  reducers: {
    addAction: (state, action: PayloadAction<DispatchAction>) => {
      state.actions.unshift(action.payload)
    },
    clearActions: (state) => {
      state.actions = []
    },
    setViewMode: (state, action: PayloadAction<'list' | 'map'>) => {
      state.viewMode = action.payload
    },
    selectAction: (state, action: PayloadAction<DispatchAction | undefined>) => {
      state.selectedAction = action.payload
    },
  },
})

export const { addAction, clearActions, setViewMode, selectAction } = dispatchSlice.actions

export default dispatchSlice.reducer
