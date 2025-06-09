'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'


interface Campanha {
  id: number
  nome: string
  descricao: string
  status_campanha: string
  publico_alvo: string
  tipo_campanha: string
  responsavel: string
}

export default function CampanhasPage() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([])

  function formatarTexto(texto: string) {
    return texto
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  useEffect(() => {
    async function fetchCampanhas() {
      try {
        const response = await api.get('/campanhas-humanitarias')
        const data = response.data
        setCampanhas(data)
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error)
      }
    }
    fetchCampanhas()
  }, [])

  return (
    <>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Campanhas Humanitárias</h1>
        <ul className="space-y-3">
          {campanhas.map((campanha) => (
            <li key={campanha.id} className="border p-4 rounded-md shadow-sm bg-white">
              <h2 className="text-lg font-bold">{campanha.nome}</h2>
              <p>{campanha.descricao}</p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {campanha.status_campanha ? formatarTexto(campanha.status_campanha) : 'Não informado'}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Público-alvo:</strong> {campanha.publico_alvo || 'Não informado'}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Tipo de campanha:</strong> {campanha.tipo_campanha ? formatarTexto(campanha.tipo_campanha) : 'Não informado'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Responsável:</strong> {campanha.responsavel || 'Não informado'}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}