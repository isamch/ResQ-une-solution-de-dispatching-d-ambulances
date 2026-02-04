'use client'

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Ambulance, AlertCircle, TrendingUp, Clock } from 'lucide-react'

interface KPI {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendDirection?: 'up' | 'down'
}

interface KPIGridProps {
  ambulancesAvailable: number
  activeIncidents: number
  avgResponseTime: number
  completedToday: number
}

export default function KPIGrid({
  ambulancesAvailable,
  activeIncidents,
  avgResponseTime,
  completedToday,
}: KPIGridProps) {
  const kpis: KPI[] = [
    {
      title: 'Available Ambulances',
      value: ambulancesAvailable,
      icon: <Ambulance className="w-6 h-6 text-green-500" />,
      trend: '+2 from yesterday',
      trendDirection: 'up',
    },
    {
      title: 'Active Incidents',
      value: activeIncidents,
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      trend: '-1 from yesterday',
      trendDirection: 'down',
    },
    {
      title: 'Avg Response Time',
      value: `${avgResponseTime} min`,
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      trend: '2 min improvement',
      trendDirection: 'down',
    },
    {
      title: 'Completed Today',
      value: completedToday,
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      trend: '+15% from yesterday',
      trendDirection: 'up',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            {kpi.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className={`text-xs ${
              kpi.trendDirection === 'up' ? 'text-green-600' : 'text-blue-600'
            }`}>
              {kpi.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
