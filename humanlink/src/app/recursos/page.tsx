'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function RecursosPage() {
  return (
    <>
      <Header />
      <main className="bg-[#FDF7F0] min-h-screen px-6 py-10 flex flex-col items-center">
        <div className="max-w-3xl w-full space-y-10">
          
          <section className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-[#0C3B5D] mb-4">1. Informações de Emergência</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Defesa Civil:</strong> 199</li>
              <li><strong>Corpo de Bombeiros:</strong> 193</li>
              <li><strong>SAMU:</strong> 192</li>
              <li><strong>Polícia Militar:</strong> 190</li>
              <li><strong>Locais seguros:</strong> Centros comunitários, escolas e igrejas cadastradas pela prefeitura.</li>
              <li><strong>Alertas:</strong> Siga as redes oficiais da Defesa Civil para atualizações em tempo real.</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-[#0C3B5D] mb-4">2. Abrigos e Acolhimento</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Abrigo Municipal Zaki Narchi:</strong> Av. Zaki Narchi, 356 - Santana, São Paulo - SP (Aceita animais)</li>
              <li><strong>Escola Municipal Aurora:</strong> R. das Rosas, 45 - Alimentação disponível</li>
              <li><strong>Igreja São Lucas:</strong> Av. Central, 320 - Capacidade reduzida, com colchões e mantimentos</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-[#0C3B5D] mb-4">3. Distribuição de Alimentos, Roupas e Produtos de Higiene</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Entrega de Doações:</strong> Segunda a sábado, das 9h às 17h, no Ginásio Municipal</li>
              <li><strong>Solicitar ajuda emergencial:</strong> Ligue para 199 ou acesse ajuda.sp.gov.br</li>
              <li><strong>Doações via PIX:</strong> chave: solidario@ajuda.org</li>
              <li><strong>Itens mais necessários:</strong> Colchões, fraldas, água, medicamentos, alimentos não perecíveis</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-[#0C3B5D] mb-4">4. Atendimento à Saúde e Psicossocial</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>UBS Central:</strong> Atendimento médico gratuito 24h na Av. Saúde, 777</li>
              <li><strong>CVV - Apoio Emocional:</strong> Ligue 188 ou acesse www.cvv.org.br</li>
              <li><strong>Posto Volante Emergencial:</strong> Praça da Paz - com vacinação e primeiros socorros</li>
              <li><strong>Prevenção pós-enchente:</strong> Evite contato com água contaminada. Procure atendimento em caso de febre, dor muscular ou vômitos</li>
            </ul>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
