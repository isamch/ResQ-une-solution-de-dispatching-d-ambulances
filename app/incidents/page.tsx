'use client'

import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  setIncidents,
  updateIncidentStatus,
  selectIncident,
} from '@/lib/redux/slices/incidentsSlice'
import { incidentAPI } from '@/lib/api'
import MainLayout from '@/components/layout/MainLayout'
import IncidentList from '@/components/incidents/IncidentList'
import IncidentDetails from '@/components/incidents/IncidentDetails'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function IncidentsHistoryPage() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const incidents = useAppSelector(state => state.incidents.incidents)
  const selectedIncident = useAppSelector(state => state.incidents.selectedIncident)

  const { data: incidentsData } = useQuery({
    queryKey: ['incidents'],
    queryFn: incidentAPI.getAll,
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) =>
      incidentAPI.update(id, { status }),
    onSuccess: (data) => {
      dispatch(updateIncidentStatus({ id: data.id, status: data.status }))
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
    },
  })

  useEffect(() => {
    if (incidentsData) {
      dispatch(setIncidents(incidentsData))
    }
  }, [incidentsData, dispatch])

  const stats = {
    total: incidents.length,
    pending: incidents.filter(i => i.status === 'Pending').length,
    inProgress: incidents.filter(i => i.status === 'In Progress').length,
    completed: incidents.filter(i => i.status === 'Completed').length,
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Incident History</h1>
          <p className="text-muted-foreground">View and manage all incidents</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-500">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <IncidentList
                  incidents={incidents}
                  selectedId={selectedIncident?.id}
                  onSelect={(incident) => dispatch(selectIncident(incident))}
                  onStatusChange={(id, status) =>
                    updateStatusMutation.mutate({ id, status })
                  }
                />
              </CardContent>
            </Card>
          </div>
          <div>
            <IncidentDetails incident={selectedIncident} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
