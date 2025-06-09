'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import CadastroForm from './CadastroForm'

export default function CadastroPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-[#FDF7F0] px-4 py-12">
        <CadastroForm />
      </main>
      <Footer />
    </>
  )
}