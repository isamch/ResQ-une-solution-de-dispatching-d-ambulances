'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setFilter } from '@/lib/redux/slices/ambulancesSlice'
import type { AmbulanceStatus } from '@/lib/redux/slices/ambulancesSlice'

const filters: (AmbulanceStatus | 'All')[] = ['All', 'Available', 'Busy', 'Maintenance']

export default function AmbulanceFilter() {
  const dispatch = useAppDispatch()
  const currentFilter = useAppSelector(state => state.ambulances.filter)

  return (
    <div className="absolute top-4 right-4 z-50 bg-card p-4 rounded-lg border border-border shadow-lg">
      <p className="text-sm font-semibold mb-2">Filter Ambulances</p>
      <div className="flex gap-2 flex-wrap">
        {filters.map(filter => (
          <Button
            key={filter}
            variant={currentFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => dispatch(setFilter(filter))}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  )
}
