'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const workloadData = [
  { time: '00:00', incidents: 2, completed: 1 },
  { time: '04:00', incidents: 1, completed: 1 },
  { time: '08:00', incidents: 4, completed: 3 },
  { time: '12:00', incidents: 6, completed: 5 },
  { time: '16:00', incidents: 8, completed: 7 },
  { time: '20:00', incidents: 5, completed: 4 },
]

const responseTimeData = [
  { day: 'Mon', time: 6.2 },
  { day: 'Tue', time: 5.8 },
  { day: 'Wed', time: 5.4 },
  { day: 'Thu', time: 5.9 },
  { day: 'Fri', time: 5.1 },
  { day: 'Sat', time: 5.6 },
  { day: 'Sun', time: 5.3 },
]

export default function PerformanceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Workload Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workloadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="incidents" fill="var(--color-chart-1)" />
              <Bar dataKey="completed" fill="var(--color-chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Time Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="time"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
