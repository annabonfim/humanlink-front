'use client'

import { useState } from 'react'
import type { AxiosError } from 'axios'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import TextArea from '@/components/TextArea/TextArea'
import Button from '@/components/Button/Button'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import api from '@/services/api'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

export default function NovaDoacaoPage() {
  const [form, setForm] = useState({
    tipo: '',
    quantidade: '',
    descricao: '',
    destino: '',
    nome: '',
    contato: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (typeof window === 'undefined') return;

    try {
      const authId = localStorage.getItem('usuarioId');
      if (!authId) {
        alert('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const payload = {
        tipoDoacao: form.tipo,
        quantidadeDoacao: Number(form.quantidade),
        descricao: form.descricao,
        destinoDoacao: form.destino,
        dataDoacao: new Date().toISOString().split('T')[0],
        status: 'PENDENTE',
        idUsuario: Number(authId),
        idAreaDesastre: 1,
        idCampanhaHumanitaria: 1
      }

      console.log('Payload final enviado:', payload)

      const res = await api.post('/registro-doacao', payload)

      if (res.status === 200 || res.status === 201) {
        alert('Doação registrada com sucesso!')
      } else {
        alert('Erro ao registrar doação.')
      }
    } catch (error: unknown) {
      console.error('Erro ao enviar doação:', error);
      const axiosError = error as AxiosError<{ message: string }>;

      if (
        axiosError?.response?.data
      ) {
        console.error('Erro detalhado do backend:', axiosError.response.data);
      }

      alert('Erro de conexão ao registrar a doação.');
    }
  }

  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="min-h-screen bg-[#FDF7F0] px-6 py-10 flex justify-center">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full space-y-4">
            <h1 className="text-2xl font-bold text-[#0C3B5D] text-center mb-4">Registrar Nova Doação</h1>

            <Select
              label="Tipo de Doação"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              options={[
                { value: 'alimento', label: 'Alimento' },
                { value: 'agua', label: 'Água' },
                { value: 'roupa', label: 'Roupa' },
                { value: 'higiene', label: 'Kit de Higiene' },
                { value: 'medicamento', label: 'Medicamento' },
                { value: 'outros', label: 'Outros' },
              ]}
              required
            />

            <Input
              label="Quantidade"
              name="quantidade"
              type="number"
              value={form.quantidade}
              onChange={handleChange}
              required
            />

            <TextArea
              label="Descrição"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows={4}
              required
            />

            <Input
              label="Destino"
              name="destino"
              value={form.destino}
              onChange={handleChange}
              required
            />

            <Input
              label="Nome do Doador"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <Input
              label="Telefone ou E-mail"
              name="contato"
              value={form.contato}
              onChange={handleChange}
              required
            />

            <fieldset className="border rounded-md p-4">
              <legend className="text-sm font-semibold text-[#0C3B5D] mb-2">Informar local de retirada (opcional)</legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="CEP" name="cep" value={form.cep || ''} onChange={handleChange} />
                <Input label="Endereço" name="endereco" value={form.endereco || ''} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Input label="Número" name="numero" value={form.numero || ''} onChange={handleChange} />
                <Input label="Complemento" name="complemento" value={form.complemento || ''} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Input label="Cidade" name="cidade" value={form.cidade || ''} onChange={handleChange} />
                <Input label="Estado" name="estado" value={form.estado || ''} onChange={handleChange} />
              </div>
            </fieldset>

            <div className="flex justify-center pt-4">
              <Button type="submit" className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900">
                Registrar
              </Button>
            </div>
          </form>
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  )
}