'use client'

import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  setAmbulances,
  updateAmbulanceStatus,
  removeAmbulance,
  addAmbulance,
} from '@/lib/redux/slices/ambulancesSlice'
import { ambulanceAPI } from '@/lib/api'
import MainLayout from '@/components/layout/MainLayout'
import AmbulanceTable from '@/components/fleet/AmbulanceTable'
import AddAmbulanceDialog from '@/components/fleet/AddAmbulanceDialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FleetManagementPage() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const ambulances = useAppSelector(state => state.ambulances.ambulances)

  const { data: ambulancesData } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceAPI.getAll,
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) =>
      ambulanceAPI.update(id, { status }),
    onSuccess: (data) => {
      dispatch(updateAmbulanceStatus({ id: data.id, status: data.status }))
      queryClient.invalidateQueries({ queryKey: ['ambulances'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ambulanceAPI.delete(id),
    onSuccess: (_, id) => {
      dispatch(removeAmbulance(id))
      queryClient.invalidateQueries({ queryKey: ['ambulances'] })
    },
  })

  const createMutation = useMutation({
    mutationFn: (ambulance: any) => ambulanceAPI.create(ambulance),
    onSuccess: (data) => {
      dispatch(addAmbulance(data))
      queryClient.invalidateQueries({ queryKey: ['ambulances'] })
    },
  })

  useEffect(() => {
    if (ambulancesData) {
      dispatch(setAmbulances(ambulancesData))
    }
  }, [ambulancesData, dispatch])

  const availableCount = ambulances.filter(a => a.status === 'Available').length
  const busyCount = ambulances.filter(a => a.status === 'Busy').length
  const maintenanceCount = ambulances.filter(a => a.status === 'Maintenance').length

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Fleet Management</h1>
            <p className="text-muted-foreground">Manage ambulances and maintenance</p>
          </div>
          <AddAmbulanceDialog onAdd={(ambulance) => createMutation.mutate(ambulance)} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Ambulances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ambulances.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{availableCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Busy/Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{busyCount + maintenanceCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ambulances</CardTitle>
          </CardHeader>
          <CardContent>
            <AmbulanceTable
              ambulances={ambulances}
              onStatusChange={(id, status) =>
                updateStatusMutation.mutate({ id, status })
              }
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
