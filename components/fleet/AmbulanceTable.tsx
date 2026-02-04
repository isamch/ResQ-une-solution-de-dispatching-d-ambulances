'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import StatusBadge from '@/components/common/StatusBadge'
import type { Ambulance, AmbulanceStatus } from '@/lib/redux/slices/ambulancesSlice'

interface AmbulanceTableProps {
  ambulances: Ambulance[]
  onStatusChange?: (id: string, status: AmbulanceStatus) => void
  onDelete?: (id: string) => void
}

export default function AmbulanceTable({
  ambulances,
  onStatusChange,
  onDelete,
}: AmbulanceTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Call Sign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Crew</TableHead>
            <TableHead>Response Time</TableHead>
            <TableHead>Incidents</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ambulances.map(ambulance => (
            <TableRow key={ambulance.id}>
              <TableCell className="font-medium">{ambulance.callSign}</TableCell>
              <TableCell>
                <Select
                  value={ambulance.status}
                  onValueChange={(status) => onStatusChange?.(ambulance.id, status as AmbulanceStatus)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {ambulance.crew.map(member => (
                    <div key={member}>{member}</div>
                  ))}
                </div>
              </TableCell>
              <TableCell>{ambulance.responseTime} min</TableCell>
              <TableCell>{ambulance.incidents}</TableCell>
              <TableCell>
                <div className="text-sm max-w-48">
                  {ambulance.equipment.join(', ')}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete?.(ambulance.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
