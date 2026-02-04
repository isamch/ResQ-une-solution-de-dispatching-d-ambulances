'use client'

import { MapContainer as LeafletMapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { ReactNode } from 'react'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  children: ReactNode
}

export default function MapComponent({ children }: MapComponentProps) {
  return (
    <LeafletMapContainer
      center={[40.7128, -74.006]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {children}
    </LeafletMapContainer>
  )
}
