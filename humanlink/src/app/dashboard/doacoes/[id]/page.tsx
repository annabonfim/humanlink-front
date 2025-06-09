'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import api from '@/services/api'

type Doacao = {
  idRegistro: number
  tipoDoacao: string
  descricao: string
  destinoDoacao: string
  status?: string
  nomeDoador: string
  contato: string
  dataDoacao: string
  idUsuario: number
}

export default function DoacaoDetalhePage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [doacao, setDoacao] = useState<Doacao | null>(null)
  const [usuario, setUsuario] = useState<{ nome: string; email: string } | null>(null)

  useEffect(() => {
    async function fetchDoacao() {
      if (id) {
        try {
          const res = await api.get(`/registro-doacao/${id}`)
          const data = res.data
          console.log(data)
          setDoacao(data)
          const usuarioRes = await api.get(`/usuario/${data.idUsuario}`)
          const usuario = usuarioRes.data
          setUsuario(usuario)
        } catch (error) {
          console.error('Erro ao carregar doação:', error)
        }
      }
    }

    fetchDoacao()
  }, [id])

  if (!doacao) {
    return <p className="text-center py-10">Carregando...</p>
  }

  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="min-h-screen bg-[#FDF7F0] px-6 py-10 flex justify-center">
          <div className="max-w-3xl w-full bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-bold text-[#0C3B5D] mb-6">{doacao.tipoDoacao}</h1>
            <p className="text-base text-gray-800 mb-4">{doacao.descricao}</p>
            <ul className="text-gray-800 text-sm space-y-2">
              <li><span className="font-semibold">Destino:</span> {doacao.destinoDoacao}</li>
              <li><span className="font-semibold">Doador:</span> {usuario?.nome || 'Não informado'}</li>
              <li><span className="font-semibold">Contato:</span> {usuario?.email || 'Não informado'}</li>
              <li><span className="font-semibold">Data:</span> {new Date(doacao.dataDoacao).toLocaleString()}</li>
            </ul>
          </div>
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  )
}