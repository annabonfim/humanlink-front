import { NextResponse } from 'next/server'

const BASE_URL = 'https://humanlink-api-production.up.railway.app/humanlink' 


export async function POST(req: Request) {
  const credentials = await req.json()

  try {
    const response = await fetch(`${BASE_URL}/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error('Falha ao autenticar usuário')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Erro ao comunicar com o backend' }, { status: 500 })
  }
}