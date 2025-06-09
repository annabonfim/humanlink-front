'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/Card/Card'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Link from 'next/link'
import api from '@/services/api'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

interface Doacao {
  id: number
  tipoDoacao: string
  descricao: string
  dataDoacao: string
  nomeDoador?: string
}

export default function DoacoesPage() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])

  useEffect(() => {
    async function fetchDoacoes() {
      try {
        const res = await api.get('/registro-doacao')
        const data = res.data
        setDoacoes(data)
      } catch (error) {
        console.error('Erro ao buscar doações:', error)
      }
    }

    fetchDoacoes()
  }, [])

  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <SectionTitle title="Doações disponíveis" subtitle="Itens que podem ser retirados nos pontos indicados" />
          <Link href="/dashboard/doacoes/nova" className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900">
            Registrar Doação
          </Link>
        </div>
        <div className="space-y-6">
          {doacoes.map((doacao) => (
            <Card
              key={`doacao-${doacao.id ?? Math.random().toString(36).substr(2, 9)}`}
              title={doacao.tipoDoacao || 'Doação'}
              description={doacao.descricao || 'Sem descrição'}
              status="disponivel"
              autor={doacao.nomeDoador || 'Anônimo'}
              hora={new Date(doacao.dataDoacao).toLocaleDateString('pt-BR')}
              href={`/dashboard/doacoes/${doacao.id}`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
