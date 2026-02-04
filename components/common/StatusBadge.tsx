import { Badge } from '@/components/ui/badge'

type Status = 'Available' | 'Busy' | 'Maintenance' | 'Low' | 'Medium' | 'High' | 'Critical' | 'Pending' | 'In Progress' | 'Completed'

const statusStyles: Record<Status, { bg: string; text: string }> = {
  Available: { bg: 'bg-green-100', text: 'text-green-800' },
  Busy: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  Maintenance: { bg: 'bg-gray-100', text: 'text-gray-800' },
  Low: { bg: 'bg-blue-100', text: 'text-blue-800' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  High: { bg: 'bg-orange-100', text: 'text-orange-800' },
  Critical: { bg: 'bg-red-100', text: 'text-red-800' },
  Pending: { bg: 'bg-gray-100', text: 'text-gray-800' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-800' },
  Completed: { bg: 'bg-green-100', text: 'text-green-800' },
}

interface StatusBadgeProps {
  status: Status
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const styles = statusStyles[status]
  return (
    <Badge className={`${styles.bg} ${styles.text} ${className}`}>
      {status}
    </Badge>
  )
}
