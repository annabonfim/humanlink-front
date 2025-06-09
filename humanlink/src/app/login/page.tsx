'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
      <>
        <Header />
        <main className="flex flex-col min-h-screen bg-[#FDF7F0]">
          <div className="flex flex-col items-center justify-center flex-grow py-16">
            <LoginForm />
          </div>
          <Footer />
        </main>
      </>
  
  )
}