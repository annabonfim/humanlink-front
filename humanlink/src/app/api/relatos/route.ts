import { NextResponse } from 'next/server'

const API_URL = 'https://humanlink-api-production.up.railway.app/humanlink'

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/relatos`)
    if (!res.ok) throw new Error('Erro ao buscar relatos')
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Falha ao buscar relatos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const res = await fetch(`${API_URL}/relatos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Erro ao enviar relato')
    const response = await res.json()
    return NextResponse.json(response, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Falha ao enviar relato' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const res = await fetch(`${API_URL}/relatos/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Erro ao atualizar relato')
    const response = await res.json()
    return NextResponse.json(response)
  } catch {
    return NextResponse.json({ error: 'Falha ao atualizar relato' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const res = await fetch(`${API_URL}/relatos/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Erro ao remover relato')
    return NextResponse.json({ message: 'Relato removido com sucesso' })
  } catch {
    return NextResponse.json({ error: 'Falha ao remover relato' }, { status: 500 })
  }
}