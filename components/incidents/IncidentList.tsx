'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import StatusBadge from '@/components/common/StatusBadge'
import type { Incident, IncidentStatus } from '@/lib/redux/slices/incidentsSlice'
import { formatDistanceToNow } from 'date-fns'

interface IncidentListProps {
  incidents: Incident[]
  onStatusChange?: (id: string, status: IncidentStatus) => void
  onSelect?: (incident: Incident) => void
  selectedId?: string
}

export default function IncidentList({
  incidents,
  onStatusChange,
  onSelect,
  selectedId,
}: IncidentListProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Ambulance</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map(incident => (
            <TableRow
              key={incident.id}
              className={`cursor-pointer hover:bg-muted ${selectedId === incident.id ? 'bg-muted' : ''}`}
              onClick={() => onSelect?.(incident)}
            >
              <TableCell className="font-medium">{incident.patient}</TableCell>
              <TableCell className="text-sm">{incident.address}</TableCell>
              <TableCell>
                <StatusBadge status={incident.severity as any} />
              </TableCell>
              <TableCell>
                <Select
                  value={incident.status}
                  onValueChange={(status) => onStatusChange?.(incident.id, status as IncidentStatus)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-sm">
                {incident.assignedAmbulance || 'Unassigned'}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
