'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setAmbulances } from '@/lib/redux/slices/ambulancesSlice'
import { setIncidents } from '@/lib/redux/slices/incidentsSlice'
import { ambulanceAPI, incidentAPI } from '@/lib/api'
import MainLayout from '@/components/layout/MainLayout'
import KPIGrid from '@/components/dashboard/KPIGrid'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import PerformanceChart from '@/components/dashboard/PerformanceChart'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const ambulances = useAppSelector(state => state.ambulances.ambulances)
  const incidents = useAppSelector(state => state.incidents.incidents)
  const actions = useAppSelector(state => state.dispatch.actions)

  const { data: ambulancesData } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceAPI.getAll,
  })

  const { data: incidentsData } = useQuery({
    queryKey: ['incidents'],
    queryFn: incidentAPI.getAll,
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

  const availableAmbulances = ambulances.filter(a => a.status === 'Available').length
  const activeIncidents = incidents.filter(i => i.status === 'Pending' || i.status === 'In Progress').length
  const avgResponseTime = ambulances.length > 0
    ? Math.round(ambulances.reduce((sum, a) => sum + (a.responseTime || 0), 0) / ambulances.length)
    : 0
  const completedToday = incidents.filter(i => i.status === 'Completed').length

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to ResQ Dispatch System</p>
        </div>

        <KPIGrid
          ambulancesAvailable={availableAmbulances}
          activeIncidents={activeIncidents}
          avgResponseTime={avgResponseTime}
          completedToday={completedToday}
        />

        <PerformanceChart />

        <ActivityFeed actions={actions} />
      </div>
    </MainLayout>
  )
}
