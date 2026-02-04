'use client'

import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  setAmbulances,
  updateAmbulanceStatus,
} from '@/lib/redux/slices/ambulancesSlice'
import {
  setIncidents,
  createIncident,
  updateIncidentStatus,
  assignAmbulance,
} from '@/lib/redux/slices/incidentsSlice'
import { addAction } from '@/lib/redux/slices/dispatchSlice'
import { ambulanceAPI, incidentAPI } from '@/lib/api'
import MainLayout from '@/components/layout/MainLayout'
import MapContainer from '@/components/map/MapContainer'
import DispatchPanel from '@/components/map/DispatchPanel'
import AmbulanceFilter from '@/components/map/AmbulanceFilter'

export default function DispatchMapPage() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const ambulances = useAppSelector(state => state.ambulances.ambulances)
  const incidents = useAppSelector(state => state.incidents.incidents)

  const { data: ambulancesData } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceAPI.getAll,
  })

  const { data: incidentsData } = useQuery({
    queryKey: ['incidents'],
    queryFn: incidentAPI.getAll,
  })

  const createIncidentMutation = useMutation({
    mutationFn: (incident: any) => incidentAPI.create(incident),
    onSuccess: (data) => {
      dispatch(createIncident(data))
      dispatch(addAction({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: 'incident_created',
        description: `Incident created for ${data.patient} at ${data.address}`,
        severity: data.severity.toLowerCase() as any,
      }))
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
    },
  })

  const assignAmbulanceMutation = useMutation({
    mutationFn: ({ incidentId, ambulanceId }: { incidentId: string; ambulanceId: string }) =>
      incidentAPI.update(incidentId, { assignedAmbulance: ambulanceId }),
    onSuccess: (data, variables) => {
      dispatch(assignAmbulance({
        incidentId: variables.incidentId,
        ambulanceId: variables.ambulanceId,
      }))
      dispatch(updateAmbulanceStatus({
        id: variables.ambulanceId,
        status: 'Busy',
      }))
      dispatch(addAction({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: 'ambulance_assigned',
        description: `Ambulance assigned to incident`,
      }))
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
    },
  })

  useEffect(() => {
    if (ambulancesData) {
      dispatch(setAmbulances(ambulancesData))
    }
  }, [ambulancesData, dispatch])

  useEffect(() => {
    if (incidentsData) {
      dispatch(setIncidents(incidentsData))
    }
  }, [incidentsData, dispatch])

  return (
    <MainLayout>
      <div className="relative w-full h-full">
        <MapContainer />
        <DispatchPanel
          ambulances={ambulances}
          incidents={incidents}
          onCreateIncident={(incident) => createIncidentMutation.mutate(incident)}
          onAssignAmbulance={(incidentId, ambulanceId) =>
            assignAmbulanceMutation.mutate({ incidentId, ambulanceId })
          }
        />
        <AmbulanceFilter />
      </div>
    </MainLayout>
  )
}
