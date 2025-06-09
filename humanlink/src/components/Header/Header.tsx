'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  if (!mounted) return null

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-[#0C3B5D] text-2xl font-bold">HumanLink</span>
        <Image src="/logo-sem-fundo.png" alt="Logo HumanLink" width={48} height={48} />
      </Link>
      <nav className="space-x-4 flex items-center">
        {['/login', '/cadastro', '/recursos'].includes(pathname) && !pathname.startsWith('/dashboard') && (
          <>
            <Link href="/" className="text-[#0C3B5D] hover:underline">Início</Link>
          </>
        )}

        {pathname.startsWith('/dashboard') || pathname.startsWith('/mapa') || pathname.startsWith('/doacoes') || pathname.startsWith('/necessidades') || pathname.startsWith('/relatos') || pathname.startsWith('/campanhas') || pathname === '/recursos' ? (
          <>
            <Link href="/dashboard" className="text-[#0C3B5D] hover:underline">Painel</Link>
            <Link href="/dashboard/mapa" className="text-[#0C3B5D] hover:underline">Mapa</Link>
            <Link href="/dashboard/doacoes" className="text-[#0C3B5D] hover:underline">Doações</Link>
            <Link href="/dashboard/campanha-humanitaria" className="text-[#0C3B5D] hover:underline">Campanhas</Link>
            <Link href="/dashboard/voluntario" className="text-[#0C3B5D] hover:underline">Voluntário</Link>
            <Link href="/dashboard/relatos" className="text-[#0C3B5D] hover:underline">Relatos</Link>
            <Link href="/recursos" className="text-[#0C3B5D] hover:underline">Recursos</Link>

            <div className="relative">
              <button
                className="relative text-[#0C3B5D] focus:outline-none"
                onClick={() => {
                  router.push('/dashboard/notificacoes');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#0C3B5D]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center gap-2 text-[#0C3B5D] font-medium focus:outline-none"
                onClick={() => setOpen(!open)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-50">
                  <Link href="/dashboard/perfil" className="block px-4 py-2 hover:bg-gray-100">Editar Perfil</Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('authToken');
                      router.push('/');
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </>
        ) : pathname === '/login' ? (
          <Link href="/cadastro" className="bg-[#D64541] text-white px-4 py-1 rounded hover:bg-red-700">Cadastrar</Link>
        ) : pathname === '/cadastro' ? (
          <Link href="/login" className="bg-[#0C3B5D] text-white px-4 py-1 rounded hover:bg-blue-900">Login</Link>
        ) : (
          <>
            <Link href="/login" className="bg-[#0C3B5D] text-white px-4 py-1 rounded hover:bg-blue-900">Entrar</Link>
            <Link href="/cadastro" className="ml-2 bg-[#D64541] text-white px-4 py-1 rounded hover:bg-red-700">Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  )
}
