'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

export default function VoluntarioDashboardPage() {
  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="bg-[#FDF7F0] min-h-screen px-6 py-10 flex flex-col items-center">
          <div className="max-w-3xl w-full space-y-6">
            <h1 className="text-2xl font-bold text-[#0C3B5D] text-center">Área do Voluntário</h1>
            <p className="text-gray-700 text-center">
              Aqui você pode oferecer ajuda, visualizar oportunidades de apoio e acompanhar suas atividades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/dashboard/voluntario/oportunidades" className="block bg-white rounded-md shadow-md p-4 hover:shadow-lg">
                <h2 className="text-lg font-semibold text-[#0C3B5D] mb-2">Oportunidades de Ajuda</h2>
                <p className="text-sm text-gray-600">Veja necessidades cadastradas por outros usuários e ofereça sua colaboração.</p>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  )
}