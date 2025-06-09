'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import api from '@/services/api'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

export default function PerfilPage() {
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    email: '',
    novaSenha: '',
    senhaAtual: '',
    telefone: '',
    cpf: '',
    data_criacao: ''
  })
  const [usuarioId, setUsuarioId] = useState<number | null>(null)
  const [userTipos, setUserTipos] = useState<string[]>(['Voluntária'])
  const userLocalizacao = 'São Paulo - SP'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((form.novaSenha !== '' || form.senhaAtual !== '') && form.senhaAtual === '') {
      alert('Por favor, insira sua senha atual para confirmar as alterações.')
      return
    }
    // Funções de formatação encapsuladas dentro de handleSubmit
    const formatarCpf = (cpf: string) =>
      cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')

    const formatarTelefone = (telefone: string) =>
      telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')

    try {
      const payload = {
        id_usuario: usuarioId!,
        nome: form.nome,
        cpf: formatarCpf(form.cpf),
        email: form.email,
        telefone: formatarTelefone(form.telefone),
        tipo_usuario: userTipos[0].toUpperCase()
      }

      console.log("Data de criação formatada:", form.data_criacao)
      console.log('Payload enviado para atualização:', payload)
      await api.put(`/usuario/${payload.id_usuario}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      alert('Perfil atualizado com sucesso!')
      setEditando(false)
      setForm(prev => ({ ...prev, senhaAtual: '', novaSenha: '' }))
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      alert('Erro ao atualizar usuário.')
    }
  }

  const cancelarEdicao = () => {
    setEditando(false)
    if (usuarioId) {
      fetchUsuario()
    }
  }

  const [mostrarModal, setMostrarModal] = useState(false)
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("")

    useEffect(() => {
      const idSalvo = localStorage.getItem('usuarioId')
      console.log(idSalvo)
      if (idSalvo) {
        const id = Number(idSalvo)
        setUsuarioId(id)

        api.get(`/usuario/${id}`)
          .then(res => {
            const data = res.data
            setForm(prev => ({
              ...prev,
              nome: data.nome || '',
              email: data.email || '',
              telefone: data.telefone || '',
              cpf: data.cpf || '',
              data_criacao: new Date(data.data_criacao).toISOString().slice(0, 10),
              novaSenha: '',
              senhaAtual: '',
            }))
            setUserTipos([data.tipo_usuario || ''])
          })
          .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error)
          })
      }
    }, [])

  async function fetchUsuario() {
    if (!usuarioId) return
    try {
      const res = await api.get(`/usuario/${usuarioId}`)
      const data = res.data
      setForm(prev => ({
        ...prev,
        nome: data.nome || '',
        email: data.email || '',
        telefone: data.telefone || '',
        cpf: data.cpf || '',
        data_criacao: new Date(form.data_criacao).toISOString().slice(0, 10),        
        novaSenha: '',
        senhaAtual: '',
      }))
      setUserTipos([data.tipo_usuario || ''])
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
    }
  }

  return (
    <ProtectedRoute>
      <Header />
      <main className="bg-[#FDF7F0] min-h-screen px-6 py-10 flex flex-col items-center">
        <div className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full text-center">
          <img src="/ft-perfil-F.png" alt="Foto do perfil" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0C3B5D] mb-2">
            {editando ? 'Editar Perfil' : `Olá, ${form.nome} !`}
          </h1>
          {!editando && (
            <div className="flex flex-wrap justify-center gap-2 mt-1 mb-3">
              {userTipos.map(tipo => {
                const filename = `badge-${tipo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}.png`
                return (
                  <img
                    key={tipo}
                    src={`/badges/${filename}`}
                    alt={`Badge ${tipo}`}
                    className="h-22"
                  />
                )
              })}
            </div>
          )}
          <p className="text-gray-600 mb-4">
            {editando
              ? 'Atualize suas informações.'
              : 'Gerencie suas informações de perfil e preferências de conta.'}
          </p>
          {!editando && (
            <div className="mt-10 text-center">
              <button onClick={() => setEditando(true)}
                className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900">Editar Perfil</button>
            </div>
          )}
          {!editando && (
            <div className="mt-8 text-left space-y-3">
              <p><span className="font-semibold">E-mail:</span> {form.email}</p>
              <p><span className="font-semibold">Localização:</span> {userLocalizacao}</p>
              {form.telefone && (
                <p><span className="font-semibold">Telefone:</span> {form.telefone}</p>
              )}
            </div>
          )}

          {editando ? (
            <>
              <form onSubmit={handleSubmit} className="text-left space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nome</label>
                  <input type="text" name="nome" value={form.nome} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">E-mail</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={form.cpf}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Telefone</label>
                  <input type="text" name="telefone" value={form.telefone} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Usuário</label>
                  <div className="flex gap-4 flex-wrap">
                    {['Voluntária', 'Doador', 'Vítima'].map(tipo => (
                      <label key={tipo} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={userTipos.includes(tipo)}
                          onChange={() =>
                            setUserTipos(prev =>
                              prev.includes(tipo)
                                ? prev.filter(t => t !== tipo)
                                : [...prev, tipo]
                            )
                          }
                        />
                        {tipo}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Nova Senha</label>
                  <input type="password" name="novaSenha" value={form.novaSenha} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Senha Atual <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    name="senhaAtual"
                    value={form.senhaAtual}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required={form.novaSenha !== ''}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button type="button" onClick={cancelarEdicao}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit"
                    className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900">Salvar Alterações</button>
                </div>
              </form>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setMostrarModal(true)}
                  className="text-sm text-red-600 underline hover:text-red-800"
                >
                  Desativar Conta
                </button>
                {mostrarModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-[#FDF7F0] bg-opacity-90 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-left">
                      <h2 className="text-lg font-bold text-[#0C3B5D] mb-2">Confirme sua senha</h2>
                      <p className="text-sm text-gray-700 mb-4">Digite sua senha para confirmar a desativação da conta.</p>
                      <input
                        type="password"
                        placeholder="Senha"
                        value={senhaConfirmacao}
                        onChange={(e) => setSenhaConfirmacao(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setMostrarModal(false)}
                          className="px-4 py-2 text-gray-600 hover:underline"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            if (senhaConfirmacao.trim() !== "") {
                              window.location.href = "/conta-desativada"
                            }
                          }}
                          className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}