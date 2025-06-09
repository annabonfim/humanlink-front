import { NextResponse } from 'next/server'

const BASE_URL = 'https://humanlink-api-production.up.railway.app/humanlink'


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const url = id ? `${BASE_URL}/campanhas-humanitarias/${id}` : `${BASE_URL}/campanhas-humanitarias`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${BASE_URL}/campanhas-humanitarias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const body = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório para atualizar.' }, { status: 400 })
  }

  const res = await fetch(`${BASE_URL}/campanhas-humanitarias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório para deletar.' }, { status: 400 })
  }

  const res = await fetch(`${BASE_URL}/campanhas-humanitarias/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()
  return NextResponse.json(data)
}