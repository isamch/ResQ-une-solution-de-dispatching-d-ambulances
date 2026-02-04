'use client'

import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { Incident } from '@/lib/redux/slices/incidentsSlice'

const createIncidentIcon = (severity: Incident['severity']) => {
  const colors: Record<Incident['severity'], string> = {
    Low: '#3b82f6',
    Medium: '#f59e0b',
    High: '#ef6444',
    Critical: '#dc2626',
  }

  return new L.DivIcon({
    html: `
      <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 shadow-lg" style="border-color: ${colors[severity]}">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
    `,
    className: `incident-marker-${severity.toLowerCase()}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

interface IncidentMarkerProps {
  incident: Incident
}

export default function IncidentMarker({ incident }: IncidentMarkerProps) {
  const icon = createIncidentIcon(incident.severity)

  return (
    <Marker position={[incident.location.lat, incident.location.lng]} icon={icon}>
      <Popup>
        <div className="p-2 text-sm">
          <p className="font-bold">{incident.patient}</p>
          <p className="text-xs">Address: {incident.address}</p>
          <p className="text-xs">Severity: {incident.severity}</p>
          <p className="text-xs">Status: {incident.status}</p>
          {incident.notes && <p className="text-xs">Notes: {incident.notes}</p>}
        </div>
      </Popup>
    </Marker>
  )
}
