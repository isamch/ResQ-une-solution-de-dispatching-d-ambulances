'use client'

import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { Ambulance } from '@/lib/redux/slices/ambulancesSlice'

// Create custom icons based on status
const createAmbulanceIcon = (status: Ambulance['status']) => {
  const colors: Record<Ambulance['status'], string> = {
    Available: '#22c55e',
    Busy: '#eab308',
    Maintenance: '#6b7280',
  }

  return new L.DivIcon({
    html: `
      <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-${colors[status].substring(1)} shadow-lg">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 18v1a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1a6 6 0 00-6-6h-4a6 6 0 00-6 6v1a1 1 0 01-1 1H2a1 1 0 01-1-1v-1a8 8 0 018-8h4a8 8 0 018 8z"/>
          <circle cx="12" cy="8" r="4"/>
        </svg>
      </div>
    `,
    className: `ambulance-marker-${status.toLowerCase()}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

interface AmbulanceMarkerProps {
  ambulance: Ambulance
}

export default function AmbulanceMarker({ ambulance }: AmbulanceMarkerProps) {
  const icon = createAmbulanceIcon(ambulance.status)

  return (
    <Marker position={[ambulance.location.lat, ambulance.location.lng]} icon={icon}>
      <Popup>
        <div className="p-2 text-sm">
          <p className="font-bold">{ambulance.callSign}</p>
          <p className="text-xs">Status: {ambulance.status}</p>
          <p className="text-xs">Crew: {ambulance.crew.join(', ')}</p>
          <p className="text-xs">Response: {ambulance.responseTime}min</p>
        </div>
      </Popup>
    </Marker>
  )
}
