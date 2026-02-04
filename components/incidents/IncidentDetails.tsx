'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatusBadge from '@/components/common/StatusBadge'
import type { Incident } from '@/lib/redux/slices/incidentsSlice'
import { formatDistanceToNow, format } from 'date-fns'

interface IncidentDetailsProps {
  incident: Incident | undefined
}

export default function IncidentDetails({ incident }: IncidentDetailsProps) {
  if (!incident) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Select an incident to view details
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{incident.patient}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-semibold">{incident.address}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Severity</p>
            <div className="mt-1">
              <StatusBadge status={incident.severity as any} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="mt-1">
              <StatusBadge status={incident.status as any} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Assigned Ambulance</p>
            <p className="font-semibold">
              {incident.assignedAmbulance || 'Unassigned'}
            </p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="font-semibold">
              {format(new Date(incident.createdAt), 'MMM d, yyyy HH:mm')}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
            </p>
          </div>

          {incident.completedAt && (
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-semibold">
                {format(new Date(incident.completedAt), 'MMM d, yyyy HH:mm')}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(incident.completedAt), { addSuffix: true })}
              </p>
            </div>
          )}

          {incident.notes && (
            <div>
              <p className="text-sm text-muted-foreground">Notes</p>
              <p className="font-semibold">{incident.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
