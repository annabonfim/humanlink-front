'use client'

import { useState } from 'react'
import axios from 'axios'
import api from '@/services/api'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import Button from '@/components/Button/Button'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProtectedPage from '@/components/ProtectedRoute/ProtectedRoute'
import Image from 'next/image'

export default function NovoRelatoPage() {
  const [form, setForm] = useState({
    nome: '',
    titulo: '',
    mensagem: '',
    endereco: '',
    cidade: '',
    estado: '',
    tipo_desastre: '',
    tipo_desastre_outro: '',
    urgencia: '',
    status: 'pendente',
  })

  const [midiaPreview, setMidiaPreview] = useState<string[]>([])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    const previews = Array.from(files).map((file) => URL.createObjectURL(file))
    setMidiaPreview(previews)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Formulário original:', form)
    try {
      const usuarioId = localStorage.getItem('usuarioId')
      const payload = {
        nome: form.nome,
        titulo: form.titulo,
        mensagem: form.mensagem,
        endereco: form.endereco || undefined,
        cidade: form.cidade,
        estado: form.estado,
        tipo_desastre: form.tipo_desastre,
        tipo_desastre_outro: form.tipo_desastre === 'outro' ? form.tipo_desastre_outro : undefined,
        urgencia: form.urgencia,
        status: 'pendente',
        id_usuario: usuarioId ? parseInt(usuarioId) : undefined,
        id_desastre: 1
      }
      console.log('Payload final enviado para API:', payload)
      await api.post('/relatos', payload)
      alert('Relato enviado com sucesso!')
      setForm({
        nome: '',
        titulo: '',
        mensagem: '',
        endereco: '',
        cidade: '',
        estado: '',
        tipo_desastre: '',
        tipo_desastre_outro: '',
        urgencia: '',
        status: 'pendente',
      })
      setMidiaPreview([])
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro Axios:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        })
      } else {
        console.error('Erro inesperado:', error)
      }
      alert('Erro ao enviar relato. Tente novamente.')
    }
  }

  return (
    <ProtectedPage>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full space-y-4"
        >
          <h1 className="text-2xl font-bold text-[#0C3B5D] text-center mb-4">
            Postar Novo Relato
          </h1>

          <Input
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <Input
            label="Título do Relato"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />


          <Select
            label="Tipo de Desastre"
            name="tipo_desastre"
            value={form.tipo_desastre}
            onChange={handleChange}
            options={[
              { value: 'enchente', label: 'Enchente' },
              { value: 'deslizamento', label: 'Deslizamento' },
              { value: 'incendio', label: 'Incêndio' },
              { value: 'seca', label: 'Seca' },
              { value: 'vendaval', label: 'Vendaval' },
              { value: 'granizo', label: 'Granizo' },
              { value: 'contaminacao', label: 'Contaminação' },
              { value: 'acidente', label: 'Acidente' },
              { value: 'outro', label: 'Outro' },
            ]}
            required
          />
          {form.tipo_desastre === 'outro' && (
            <Input
              label="Descreva o tipo de desastre"
              name="tipo_desastre_outro"
              value={form.tipo_desastre_outro || ''}
              onChange={handleChange}
              required
            />
          )}

          <Select
            label="Urgência"
            name="urgencia"
            value={form.urgencia}
            onChange={handleChange}
            options={[
              { value: 'baixa', label: 'Baixa' },
              { value: 'media', label: 'Média' },
              { value: 'alta', label: 'Alta' },
              { value: 'critica', label: 'Crítica' },
            ]}
            required
          />

          <div>
            <label className="block font-medium mb-1">Relato</label>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <Input
            label="Endereço (opcional)"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
          />

          <input type="hidden" name="status" value={form.status} />

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
              options={[
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
                { value: 'TO', label: 'TO' },
              ]}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Fotos ou Vídeos (opcional)</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center">
                <span className="text-2xl">📎</span>
                <span className="text-sm text-gray-600">Arraste ou clique para enviar arquivos</span>
              </div>
              <input
                type="file"
                name="midia"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {midiaPreview.length > 0 && (
            <div className="space-y-2">
              {midiaPreview.map((src, idx) => (
                <div key={idx}>
                  {src.includes('video') ? (
                    <video
                      controls
                      src={src}
                      className="max-w-full h-auto rounded"
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={`preview ${idx}`}
                      width={600}
                      height={400}
                      className="w-full h-auto rounded object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900"
            >
              Enviar Relato
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </ProtectedPage>
  )
}