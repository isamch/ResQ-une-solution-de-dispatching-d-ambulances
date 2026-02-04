'use client'

import dynamic from 'next/dynamic'
import { useAppSelector } from '@/lib/redux/hooks'
import AmbulanceMarker from './AmbulanceMarker'
import IncidentMarker from './IncidentMarker'

const MapComponent = dynamic(
  () => import('./MapComponent'),
  { ssr: false, loading: () => <div className="w-full h-full bg-muted flex items-center justify-center">Loading map...</div> }
)

export default function MapContainer() {
  const ambulances = useAppSelector(state => state.ambulances.ambulances)
  const incidents = useAppSelector(state => state.incidents.incidents)

  return (
    <MapComponent>
      {ambulances.map(ambulance => (
        <AmbulanceMarker key={ambulance.id} ambulance={ambulance} />
      ))}
      {incidents.map(incident => (
        <IncidentMarker key={incident.id} incident={incident} />
      ))}
    </MapComponent>
  )
}
