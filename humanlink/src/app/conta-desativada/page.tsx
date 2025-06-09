"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "@/services/api"

export default function ContaDesativada() {
  const router = useRouter()

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId")
    if (usuarioId) {
      api
        .delete(`/usuario/${usuarioId}`)
        .then(() => {
          localStorage.removeItem("authToken")
          localStorage.removeItem("usuarioId")
        })
        .catch((error) => {
          console.error("Erro ao desativar conta:", error)
          router.push("/erro")
        })
    }
  }, [router])

  return (
    <main className="min-h-screen bg-[#FDF7F0] flex flex-col items-center justify-center px-4 text-center">
      <Image src="/despedida.png" alt="Conta desativada" width={160} height={160} className="mb-4" />
      <h1 className="text-2xl font-bold text-[#0C3B5D] mb-2">Conta Desativada com Sucesso</h1>
      <p className="text-gray-700 max-w-md mb-2">
        Sua conta foi desativada. Se desejar reativá-la, basta fazer login novamente nos próximos 30 dias. Após esse período, todas as suas informações serão permanentemente excluídas.
      </p>
      <p className="text-sm text-gray-500 mb-6 italic">Esperamos te ver em breve!</p>

      <Link href="/login" className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900">
        Reativar agora
      </Link>
      <Link href="/" className="mt-2 text-sm text-[#0C3B5D] underline">
        Voltar para a página inicial
      </Link>
    </main>
  )
}
