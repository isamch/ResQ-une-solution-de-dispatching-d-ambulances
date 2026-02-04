'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { DispatchAction } from '@/lib/redux/slices/dispatchSlice'
import { formatDistanceToNow } from 'date-fns'

interface ActivityFeedProps {
  actions: DispatchAction[]
}

const actionTypeLabels: Record<DispatchAction['type'], string> = {
  incident_created: 'Incident Created',
  ambulance_assigned: 'Ambulance Assigned',
  status_updated: 'Status Updated',
  incident_completed: 'Incident Completed',
}

const severityColors: Record<string, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
}

export default function ActivityFeed({ actions }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.slice(0, 6).map((action) => (
            <div key={action.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">
                    {actionTypeLabels[action.type]}
                  </span>
                  {action.severity && (
                    <Badge className={severityColors[action.severity]}>
                      {action.severity}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(action.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
