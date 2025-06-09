'use client'

import Image from 'next/image'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import api from '@/services/api'

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.get('/usuario')
      const usuarios = res.data

      console.log('Usuários recebidos:', usuarios)
      console.log('Tentando logar com:', form.email, form.senha)

      const usuarioEncontrado = usuarios.find(
        (u: { email: string; senha: string; id_usuario: number }) =>
          u.email.trim().toLowerCase() === form.email.trim().toLowerCase()
      )

      if (usuarioEncontrado) {
        const tokenData = {
          token: String(usuarioEncontrado.id_usuario),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000
        }
        localStorage.setItem('authToken', JSON.stringify(tokenData))
        localStorage.setItem('usuarioId', usuarioEncontrado.id_usuario.toString())
        router.push('/dashboard')
      } else {
        alert('Credenciais inválidas. Tente novamente.')
      }
    } catch (err: unknown) {
      alert(`Erro ao tentar logar: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
      console.error('Erro no login:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-md w-full space-y-6">
      <div className="flex justify-center">
        <Image src="/logo-sem-fundo.png" alt="HumanLink logo" width={128} height={128} className="mb-2" />
      </div>
      <h1 className="text-3xl font-bold text-center text-[#0C3B5D]">Login</h1>

      <Input
        label="E-mail"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <div className="relative">
        <Input
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          name="senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px]"
          aria-label="Mostrar ou ocultar senha"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          )}
        </button>
      </div>

      <div className="text-left">
        <a href="#" className="text-sm text-blue-600 hover:underline">Esqueceu seu e-mail ou senha?</a>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900">
          Entrar
        </Button>
      </div>
    </form>
  )
}