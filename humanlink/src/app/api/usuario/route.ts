import { NextResponse } from 'next/server'

const API_BASE = 'https://humanlink-api-production.up.railway.app/humanlink'

export async function GET() {
  const res = await fetch(`${API_BASE}/usuario`)
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${API_BASE}/usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}