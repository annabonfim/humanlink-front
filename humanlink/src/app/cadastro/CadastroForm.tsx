'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import api from '@/services/api'

export default function CadastroForm() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipo: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()

  useEffect(() => {
    console.log('Monitorando CEP:', form.cep)

    const fetchAddress = async () => {
      if (/^\d{8}$/.test(form.cep)) {
        console.log('Buscando endereço via ViaCEP para:', form.cep)
        try {
          const res = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`)
          const data = await res.json()
          console.log('Resposta do ViaCEP:', data)
          if (!data.erro) {
            setForm(prevForm => ({
              ...prevForm,
              endereco: data.logradouro || '',
              bairro: data.bairro || '',
              cidade: data.localidade || ''
            }))
          } else {
            console.warn('CEP não encontrado.')
          }
        } catch (err) {
          console.error('Erro ao buscar endereço:', err)
        }
      }
    }

    fetchAddress()
  }, [form.cep])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação simples dos campos
    if (!form.nome || !form.cpf || !form.email || !form.senha || !form.confirmarSenha || !form.tipo || !form.telefone || !form.cep || !form.endereco || !form.bairro || !form.cidade) {
      alert('Por favor, preencha todos os campos.')
      return
    }
    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não coincidem.')
      return
    }

    try {
      const payload = {
        nome: form.nome,
        cpf: form.cpf,
        email: form.email,
        senha: form.senha,
        telefone: form.telefone,
        tipo_usuario: form.tipo.toUpperCase(),
        endereco: {
          cep: form.cep,
          logradouro: form.endereco,
          numero: form.numero,
          bairro: form.bairro,
          cidade: form.cidade,
          estado: form.estado
        }
      }

      console.log('Payload enviado para o backend:', payload)

      const res = await api.post('/usuario', payload)

      if (res.status === 200 || res.status === 201) {
        alert('Cadastro realizado com sucesso!');
        router.push('/login');
      } else {
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } catch (err) {
      const axiosError = err as import('axios').AxiosError;

      alert('Erro ao conectar com o servidor.');
      console.error('Erro completo:', axiosError);
      if (axiosError.response) {
        console.error('Detalhes da resposta do servidor:', axiosError.response.data);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-4xl w-full space-y-6">
      <div className="flex justify-center">
        <img src="/logo-sem-fundo.png" alt="HumanLink logo" className="h-32 mb-2" />
      </div>
      <h1 className="text-3xl font-bold text-center text-[#0C3B5D]">Cadastro</h1>

      <Select
        label="Tipo de Usuário"
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        required
        options={[
          { value: '', label: 'Selecione...' },
          { value: 'vitima', label: 'Vítima' },
          { value: 'voluntario', label: 'Voluntário' },
          { value: 'doador', label: 'Doador' },
          { value: 'ong', label: 'ONG' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome completo"
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <Input
          label="CPF"
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          required
        />

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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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

        <div className="relative">
          <Input
            label="Confirmar senha"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmarSenha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showConfirmPassword ? (
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

        <Input
          label="Telefone"
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, '')
            setForm({ ...form, telefone: onlyNums })
          }}
          required
        />

        <Input
          label="CEP"
          type="text"
          name="cep"
          value={form.cep}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, '')
            setForm({ ...form, cep: onlyNums })
          }}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Endereço"
          type="text"
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          required
        />
        <Input
          label="Número"
          type="text"
          name="numero"
          value={form.numero}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Cidade"
          name="cidade"
          value={form.cidade}
          onChange={handleChange}
          required
        />
        <Select
          label="Estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Selecione...' },
            { value: 'AC', label: 'AC' },
            { value: 'AL', label: 'AL' },
            { value: 'AP', label: 'AP' },
            { value: 'AM', label: 'AM' },
            { value: 'BA', label: 'BA' },
            { value: 'CE', label: 'CE' },
            { value: 'DF', label: 'DF' },
            { value: 'ES', label: 'ES' },
            { value: 'GO', label: 'GO' },
            { value: 'MA', label: 'MA' },
            { value: 'MT', label: 'MT' },
            { value: 'MS', label: 'MS' },
            { value: 'MG', label: 'MG' },
            { value: 'PA', label: 'PA' },
            { value: 'PB', label: 'PB' },
            { value: 'PR', label: 'PR' },
            { value: 'PE', label: 'PE' },
            { value: 'PI', label: 'PI' },
            { value: 'RJ', label: 'RJ' },
            { value: 'RN', label: 'RN' },
            { value: 'RS', label: 'RS' },
            { value: 'RO', label: 'RO' },
            { value: 'RR', label: 'RR' },
            { value: 'SC', label: 'SC' },
            { value: 'SP', label: 'SP' },
            { value: 'SE', label: 'SE' },
            { value: 'TO', label: 'TO' }
          ]}
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button type="submit" className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900">
          Cadastrar
        </Button>
      </div>
    </form>
  )
}