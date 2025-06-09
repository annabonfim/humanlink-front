'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import Image from 'next/image'
const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false })
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

export default function MapaPage() {
  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] p-4">
        <h1 className="text-2xl font-bold text-[#0C3B5D] text-center mb-4">Mapa de Pontos Importantes</h1>

        <div className="h-[70vh] w-full max-w-5xl mx-auto rounded shadow overflow-hidden">
          <Map />
        </div>

        <div className="flex gap-4 justify-center mt-4 max-w-5xl mx-auto text-[#0C3B5D]">
          <div className="flex items-center gap-2">
            <Image src="/shelter.png" alt="Abrigo" width={24} height={32} />
            <span>Abrigo</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/donation.png" alt="Ponto de Doação" width={24} height={32} />
            <span>Ponto de Doação</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/medical.png" alt="Atendimento Médico" width={24} height={32} />
            <span>Atendimento Médico</span>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}