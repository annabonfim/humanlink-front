'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '@/services/api';
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProtectedPage from '@/components/ProtectedRoute/ProtectedRoute';

interface Relato {
  id: number;
  nome: string;
  titulo: string;
  mensagem: string;
  data: string | Date;
  midiaPreview?: string[];
}

export default function RelatosPage() {
  const [relatos, setRelatos] = useState<Relato[]>([]);

  useEffect(() => {
    async function fetchRelatos() {
      try {
        const response = await api.get('/relatos');
        const dadosAPI = response.data;

        const dadosFiltrados = dadosAPI.filter((r: Relato) => r.titulo !== 'Abrigo disponível na zona norte');

        const relatoFixo = {
          id: 0,
          nome: 'Joana',
          titulo: 'Abrigo disponível na zona norte',
          mensagem:
            'Consegui abrigo no centro comunitário da zona norte. Estava com minha família sem um local seguro desde ontem e fomos muito bem recebidos por voluntários. Há ainda espaço para mais famílias, especialmente com crianças pequenas. Recomendo que venham até aqui quem estiver em necessidade.',
          data: '02/06/2025',
          midiaPreview: ['/abrigo.png'],
        };

        const dadosComRelatoFixo = [relatoFixo, ...dadosFiltrados]
          .map((relato) => ({
            ...relato,
            data:
              typeof relato.data === 'string' && !isNaN(Date.parse(relato.data))
                ? new Date(relato.data)
                : new Date(),
          }))
          .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        setRelatos(dadosComRelatoFixo);
      } catch (error) {
        console.error('Erro ao buscar relatos da API:', error);
      }
    }

    fetchRelatos();
  }, []);

  const [relatosExpandido, setRelatosExpandido] = useState<{ [id: number]: boolean }>({});

  return (
    <ProtectedPage>
      <Header />
      <main className="bg-[#FDF7F0] px-6 py-10 flex flex-col items-center">
        <div className="w-full max-w-2xl flex justify-end mb-4">
          <a
            href="/dashboard/relatos/novo"
            className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Postar Relato
          </a>
        </div>
        <div className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Relatos da Comunidade</h1>

          <section className="space-y-4 text-left">
            {relatos.map((relato) => {
              const expandido = relatosExpandido[relato.id] || false;
              const textoCurto = relato.mensagem.length > 200 && !expandido;

              return (
                <div key={`relato-${relato.id ?? relato.titulo}-${Math.random().toString(36).substr(2, 5)}`} className="bg-white border border-gray-200 rounded shadow-sm p-4">
                  <div className="text-sm text-gray-500 mb-2 font-medium">
                    {relato.nome}
                  </div>
                  <h2 className="text-lg font-semibold text-[#0C3B5D] mb-1">{relato.titulo}</h2>
                  <p className="text-gray-800">
                    {textoCurto ? `${relato.mensagem.slice(0, 200)}...` : relato.mensagem}
                    {relato.mensagem.length > 200 && (
                      <button
                        onClick={() =>
                          setRelatosExpandido(prev => ({
                            ...prev,
                            [relato.id]: !prev[relato.id],
                          }))
                        }
                        className="text-blue-600 ml-1 text-sm underline"
                      >
                        {expandido ? 'Mostrar menos' : 'Mostrar mais'}
                      </button>
                    )}
                  </p>

                  {Array.isArray(relato.midiaPreview) && relato.midiaPreview.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {relato.midiaPreview.map((src) => (
                        <div key={`${relato.id ?? relato.titulo}-${src}`}>
                          {src.includes('video') ? (
                            <video controls src={src} className="max-w-full h-auto rounded" />
                          ) : (
                            <Image src={src} alt="midia" width={800} height={600} className="max-w-full h-auto rounded" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </main>
      <Footer />
    </ProtectedPage>
  );
}