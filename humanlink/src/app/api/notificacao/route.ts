import { NextRequest, NextResponse } from 'next/server'

const API_URL = 'https://humanlink-api-production.up.railway.app/humanlink/' 

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/notificacoes`)
    if (!response.ok) {
      throw new Error('Erro ao buscar notificações')
    }

    const notificacoes = await response.json()
    return NextResponse.json(notificacoes)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar notificações' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const response = await fetch(`${API_URL}/notificacoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Erro ao enviar notificação')
    }

    const nova = await response.json()
    return NextResponse.json(nova)
  } catch {
    return NextResponse.json({ error: 'Erro ao enviar notificação' }, { status: 500 })
  }
}