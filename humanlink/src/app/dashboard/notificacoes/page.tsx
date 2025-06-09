'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import api from '@/services/api'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

type Notificacao = {
  id: number
  titulo: string
  mensagem: string
  data: string
  lida: boolean
}

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])

  useEffect(() => {
    async function fetchNotificacoes() {
      try {
        const res = await api.get('/notificacao')
        const data = res.data
        setNotificacoes(data)
      } catch (error) {
        console.error('Erro ao carregar notificações:', error)
      }
    }

    fetchNotificacoes()
  }, [])

  useEffect(() => {
    async function marcarComoLidas() {
      try {
        await Promise.all(
          notificacoes.map(n =>
            !n.lida ? api.put(`/notificacao/${n.id}`, { ...n, lida: true }) : null
          )
        )
      } catch (error) {
        console.error('Erro ao marcar notificações como lidas:', error)
      }
    }

    if (notificacoes.length > 0) {
      marcarComoLidas()
    }
  }, [notificacoes])

  return (
    <>
      <Header />
      <ProtectedRoute>
        <main className="bg-[#FDF7F0] min-h-screen px-6 py-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold text-[#0C3B5D]">Notificações</h1>
            {notificacoes.map((n) => (
              <div
                key={n.id}
                className={`p-4 border rounded-md shadow-sm ${
                  n.lida ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <h2 className="font-semibold text-[#0C3B5D]">{n.titulo}</h2>
                <p className="text-gray-700">{n.mensagem}</p>
                <p className="text-sm text-gray-500 mt-1">{n.data}</p>
              </div>
            ))}
          </div>
        </main>
      </ProtectedRoute>
      <Footer />
    </>
  )
}