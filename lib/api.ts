import axios from 'axios'
import type { Ambulance } from '@/lib/redux/slices/ambulancesSlice'
import type { Incident } from '@/lib/redux/slices/incidentsSlice'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Ambulance endpoints
export const ambulanceAPI = {
  getAll: async (): Promise<Ambulance[]> => {
    const res = await apiClient.get('/ambulances')
    return res.data
  },
  getById: async (id: string): Promise<Ambulance> => {
    const res = await apiClient.get(`/ambulances/${id}`)
    return res.data
  },
  create: async (ambulance: Omit<Ambulance, 'id'>): Promise<Ambulance> => {
    const res = await apiClient.post('/ambulances', ambulance)
    return res.data
  },
  update: async (id: string, ambulance: Partial<Ambulance>): Promise<Ambulance> => {
    const res = await apiClient.patch(`/ambulances/${id}`, ambulance)
    return res.data
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/ambulances/${id}`)
  },
}

// Incident endpoints
export const incidentAPI = {
  getAll: async (): Promise<Incident[]> => {
    const res = await apiClient.get('/incidents')
    return res.data
  },
  getById: async (id: string): Promise<Incident> => {
    const res = await apiClient.get(`/incidents/${id}`)
    return res.data
  },
  create: async (incident: Omit<Incident, 'id'>): Promise<Incident> => {
    const res = await apiClient.post('/incidents', incident)
    return res.data
  },
  update: async (id: string, incident: Partial<Incident>): Promise<Incident> => {
    const res = await apiClient.patch(`/incidents/${id}`, incident)
    return res.data
  },
}
