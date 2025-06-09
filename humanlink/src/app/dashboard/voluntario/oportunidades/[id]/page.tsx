'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const oportunidades = [
  {
    id: 1,
    titulo: 'Entrega de alimentos no centro',
    descricao: 'Precisamos de voluntários para ajudar na entrega de marmitas no centro da cidade. O ponto de encontro será na praça principal às 11h.',
    local: 'Praça Central, São Paulo - SP',
    horario: '20/06, às 11h',
    requisitos: 'Ser maior de 16 anos',
    contato: 'contato@ajuda.org',
  },
  {
    id: 2,
    titulo: 'Ajuda em abrigo comunitário',
    descricao: 'O abrigo na zona norte precisa de apoio com a organização de doações e atendimento às famílias.',
    local: 'Av. das Palmeiras, 123 - Zona Norte',
    horario: '21/06, das 9h às 14h',
    requisitos: 'Levar documento com foto',
    contato: 'abrigo@comunidade.org',
  },
  {
    id: 3,
    titulo: 'Distribuição de kits de higiene',
    descricao: 'Voluntários para distribuir kits de higiene em bairros afetados pelas enchentes.',
    local: 'Escola Municipal Aurora, Rua das Rosas, 45',
    horario: '22/06, às 10h',
    requisitos: 'Usar máscara e luvas',
    contato: 'kits@solidarios.org',
  },
]

export default function DetalhesOportunidadePage() {
  const router = useRouter()
  const { id } = useParams()
  const [dados, setDados] = useState<typeof oportunidades[0] | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const oportunidade = oportunidades.find((op) => String(op.id) === String(id))
    setDados(oportunidade || null)
  }, [id])

  if (!dados) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-[#FDF7F0]">
          <Header />
          <main className="flex-grow px-6 py-10 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white rounded shadow p-6 space-y-4">
              <p className="text-gray-500">Oportunidade não encontrada.</p>
              <button
                onClick={() => router.back()}
                className="mt-4 bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                Voltar
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-[#FDF7F0]">
        <Header />
        <main className="flex-grow px-6 py-10 flex items-center justify-center">
          <div className="max-w-3xl w-full bg-white rounded shadow p-6 space-y-4">
            <h1 className="text-2xl font-bold text-[#0C3B5D]">{dados.titulo}</h1>
            <p className="text-gray-700">{dados.descricao}</p>
            <div className="text-sm text-gray-600">
              <p><strong>Local:</strong> {dados.local}</p>
              <p><strong>Horário:</strong> {dados.horario}</p>
              <p><strong>Requisitos:</strong> {dados.requisitos}</p>
              <p><strong>Contato:</strong> {dados.contato}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Quero me cadastrar
              </button>
              <button
                onClick={() => router.back()}
                className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
              >
                Voltar
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-[#FDF7F0] bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold text-[#0C3B5D]">Cadastro confirmado!</h2>
            <p className="text-gray-700">
              Sua participação foi registrada com sucesso. Siga as instruções enviadas no e-mail ou entre em contato pelo canal informado no post.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}