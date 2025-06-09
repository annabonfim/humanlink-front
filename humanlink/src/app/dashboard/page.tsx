'use client'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import Header from '@/components/Header/Header'
import Card from '@/components/Card/Card'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

export default function DashboardPage() {

  const mockCards = useMemo(() => [
    {
      id: 1,
      title: 'Necessidade urgente',
      description: 'Família desalojada precisa de água e alimentos na região central. 5 pessoas afetadas.',
      status: 'urgente',
      autor: 'Equipe Resgate Zona Oeste',
      hora: 'há 2 horas'
    },
    {
      id: 2,
      title: 'Doação disponível',
      description: 'Doador anônimo oferece 3 colchões e itens de higiene. Retirada em ponto seguro.',
      status: 'disponivel',
      autor: 'Doador Anônimo',
      hora: 'há 3 horas'
    }
  ], []);

  const [cards, setCards] = useState<typeof mockCards>([])

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.ok ? res.json() : Promise.reject('Erro na resposta'))
      .then(data => setCards(data))
      .catch(() => {
        console.warn('Usando dados mockados do dashboard');
        setCards(mockCards);
      })
  }, [mockCards])

  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="min-h-screen bg-[#FDF7F0] px-6 py-10">
          <h1 className="text-3xl font-bold text-[#0C3B5D] mb-2">Bem-vindo ao HumanLink</h1>
          <p className="text-gray-700 mb-6">Aqui você pode visualizar necessidades registradas, ver relatos compartilhados e contribuir com ações solidárias.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <aside className="md:col-span-1 space-y-4">
              <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#0C3B5D] mb-2">Ações rápidas</h2>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/dashboard/relatos/novo" className="block text-left w-full text-[#0C3B5D] hover:underline">Registrar Relato</Link></li>
                  <li><Link href="/dashboard/voluntario" className="block text-left w-full text-[#0C3B5D] hover:underline">Oferecer Ajuda</Link></li>
                  <li><Link href="/dashboard/doacoes/nova" className="block text-left w-full text-[#0C3B5D] hover:underline">Fazer Doação</Link></li>
                  <li><Link href="/dashboard/mapa" className="block text-left w-full text-[#0C3B5D] hover:underline">Abrir Mapa</Link></li>
                </ul>
              </div>
            </aside>

           
            <section className="md:col-span-3 grid grid-cols-1 gap-4">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  status={card.status as 'urgente' | 'disponivel' | 'concluido' | 'encerrado' | 'reservado'}
                  autor={card.autor}
                  hora={card.hora}
                />
              ))}
            </section>
          </div>
        </main>
      </>
    </ProtectedRoute>
  )
}