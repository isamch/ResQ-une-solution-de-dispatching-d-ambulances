'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Plus } from 'lucide-react'
import StatusBadge from '@/components/common/StatusBadge'
import type { Incident } from '@/lib/redux/slices/incidentsSlice'
import type { Ambulance } from '@/lib/redux/slices/ambulancesSlice'

interface DispatchPanelProps {
  ambulances: Ambulance[]
  incidents: Incident[]
  onCreateIncident?: (incident: Omit<Incident, 'id' | 'createdAt'>) => void
  onAssignAmbulance?: (incidentId: string, ambulanceId: string) => void
}

export default function DispatchPanel({
  ambulances,
  incidents,
  onCreateIncident,
  onAssignAmbulance,
}: DispatchPanelProps) {
  const [activeTab, setActiveTab] = useState<'incidents' | 'quick'>('incidents')
  const [selectedSeverity, setSelectedSeverity] = useState('High')
  const [patientName, setPatientName] = useState('')
  const [address, setAddress] = useState('')

  const pendingIncidents = incidents.filter(i => i.status === 'Pending')

  const handleCreateIncident = () => {
    if (patientName && address && onCreateIncident) {
      onCreateIncident({
        address,
        location: {
          lat: 40.7128 + Math.random() * 0.05,
          lng: -74.0060 + Math.random() * 0.05,
          address,
        },
        patient: patientName,
        severity: selectedSeverity as any,
        status: 'Pending',
        notes: '',
      })
      setPatientName('')
      setAddress('')
    }
  }

  return (
    <Card className="absolute bottom-4 left-4 w-96 max-h-96 overflow-y-auto z-50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          Dispatch Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'incidents' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('incidents')}
          >
            Pending ({pendingIncidents.length})
          </Button>
          <Button
            variant={activeTab === 'quick' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('quick')}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            New
          </Button>
        </div>

        {activeTab === 'incidents' && (
          <div className="space-y-2">
            {pendingIncidents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending incidents</p>
            ) : (
              pendingIncidents.map(incident => (
                <div key={incident.id} className="p-2 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{incident.patient}</p>
                      <p className="text-xs text-muted-foreground">{incident.address}</p>
                    </div>
                    <StatusBadge status={incident.severity as any} />
                  </div>
                  {!incident.assignedAmbulance && (
                    <Select onValueChange={(id) => onAssignAmbulance?.(incident.id, id)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Assign ambulance" />
                      </SelectTrigger>
                      <SelectContent>
                        {ambulances
                          .filter(a => a.status === 'Available')
                          .map(a => (
                            <SelectItem key={a.id} value={a.id}>
                              {a.callSign} ({a.responseTime}min)
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'quick' && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold">Patient Name</label>
              <Input
                placeholder="Patient name"
                className="h-8 text-sm"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Address</label>
              <Input
                placeholder="Address"
                className="h-8 text-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Severity</label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              size="sm"
              className="w-full"
              onClick={handleCreateIncident}
              disabled={!patientName || !address}
            >
              Create Incident
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
