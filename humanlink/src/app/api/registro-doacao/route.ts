

import { NextResponse } from 'next/server'
const API_URL = 'https://humanlink-api-production.up.railway.app/humanlink'

export async function POST(req: Request) {
  const novaDoacao = await req.json()

  try {
    const response = await fetch(`${API_URL}/registro-doacao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaDoacao),
    })

    if (!response.ok) {
      throw new Error('Erro ao registrar doação')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro ao comunicar com o backend' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const atualizacao = await req.json()

  try {
    const response = await fetch(`${API_URL}/registro-doacao/${atualizacao.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(atualizacao),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar doação')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Erro ao comunicar com o backend' }, { status: 500 })
  }
}