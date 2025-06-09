'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { useRouter } from 'next/navigation'

export default function OportunidadesVoluntarioPage() {
  const router = useRouter()

  const oportunidades = [
    {
      id: 1,
      titulo: 'Entrega de alimentos no centro',
      descricao: 'Precisamos de voluntários para ajudar na entrega de marmitas no centro da cidade. O ponto de encontro será na praça principal às 11h.',
      local: 'Praça Central, São Paulo - SP',
      horario: '20/06, às 11h',
    },
    {
      id: 2,
      titulo: 'Ajuda em abrigo comunitário',
      descricao: 'O abrigo na zona norte precisa de apoio com a organização de doações e atendimento às famílias.',
      local: 'Av. das Palmeiras, 123 - Zona Norte',
      horario: '21/06, das 9h às 14h',
    },
    {
      id: 3,
      titulo: 'Distribuição de kits de higiene',
      descricao: 'Voluntários para distribuir kits de higiene em bairros afetados pelas enchentes.',
      local: 'Escola Municipal Aurora, Rua das Rosas, 45',
      horario: '22/06, às 10h',
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-[#FDF7F0] min-h-screen px-6 py-10 flex flex-col items-center">
        <div className="max-w-3xl w-full space-y-6">
          <h1 className="text-2xl font-bold text-[#0C3B5D] text-center">Oportunidades de Voluntariado</h1>
          <p className="text-gray-700 text-center">
            Abaixo estão listadas ações que precisam de voluntários. Escolha como deseja ajudar!
          </p>

          {oportunidades.map((op) => (
            <div key={op.id} className="bg-white shadow-md rounded-md p-6 space-y-2">
              <h2 className="text-lg font-bold text-[#0C3B5D]">{op.titulo}</h2>
              <p className="text-gray-700">{op.descricao}</p>
              <p className="text-sm text-gray-600"><strong>Local:</strong> {op.local}</p>
              <p className="text-sm text-gray-600"><strong>Horário:</strong> {op.horario}</p>
              <button
                className="mt-2 bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
                onClick={() => router.push(`/dashboard/voluntario/oportunidades/${op.id}`)}
              >
                Quero Ajudar
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}