'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngTuple } from 'leaflet'

export default function Map() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const shelterIcon = L.icon({
    iconUrl: '/shelter.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  const donationIcon = L.icon({
    iconUrl: '/donation.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  const medicalIcon = L.icon({
    iconUrl: '/medical.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  const pontos: { tipo: string; pos: LatLngTuple; label: string; endereco: string; icon: L.Icon }[] = [
    {
      tipo: 'abrigo',
      pos: [-23.53, -46.62],
      label: 'Abrigo Zona Norte',
      endereco: 'Rua das Flores, 123',
      icon: shelterIcon
    },
    {
      tipo: 'doacao',
      pos: [-23.54, -46.65],
      label: 'Ponto de Doação',
      endereco: 'Av. Solidariedade, 456',
      icon: donationIcon
    },
    {
      tipo: 'medico',
      pos: [-23.56, -46.61],
      label: 'Atendimento Médico',
      endereco: 'Rua Esperança, 789',
      icon: medicalIcon
    }
  ]

  return (
    <MapContainer center={[-23.55, -46.63]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pontos.map((p, i) => (
        <Marker key={i} position={p.pos as [number, number]} icon={p.icon}>
          <Popup>
            <strong>{p.label}</strong><br />
            {p.endereco}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}