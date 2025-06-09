import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/Card/Card'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDF7F0] text-gray-800">
      <Header />

      <section id="inicio" className="text-center px-6 py-16">
        <h1 className="text-4xl font-bold text-[#0C3B5D] mb-4">HumanLink -</h1>
        <h2 className="text-4xl font-bold text-[#0C3B5D] mb-4">Conectando pessoas em momentos de crise</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Plataforma solidária para registrar necessidades, visualizar ajuda disponível e conectar pessoas em tempo real.
        </p>
          <Image src="/banner.png" alt="HumanLink cartoon" width={650} height={150} className="mx-auto my-6" />
       
  
        <div className="flex justify-center mb-0">
          <Link href="#sobre" className="bg-[#0C3B5D] text-white px-6 py-3 rounded-md hover:bg-blue-900">Saiba mais</Link>
        </div>
      </section>

  
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-4 max-w-5xl mx-auto">
        <Card title="Vítimas podem registrar necessidades">
          Relate sua situação, localização e o tipo de ajuda que precisa.
        </Card>
        <Card title="Voluntários e doadores podem ajudar">
          Encontre pedidos próximos, filtre por urgência e ofereça apoio.
        </Card>
      </section>

      
      <section id="sobre" className="bg-[#0C3B5D] text-white py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4">Sobre o HumanLink</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-200 leading-relaxed">
          HumanLink é uma plataforma humanitária desenvolvida para responder a desastres e emergências climáticas.
          Facilitamos a conexão entre vítimas, doadores, voluntários e abrigos — com foco em geolocalização, prioridade
          e agilidade no atendimento.
        </p>
      </section>

      <Footer />
    </main>
  )
}