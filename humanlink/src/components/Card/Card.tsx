'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

type CardProps = {
  id?: number
  title: string
  subtitle?: string
  tags?: string[]
  href?: string
  description?: string
  status?: 'urgente' | 'disponivel' | 'concluido' | 'encerrado' | 'reservado'
  autor?: string
  hora?: string
  children?: ReactNode
}

export default function Card({ id, title, subtitle, tags, href, description, status, autor, hora, children }: CardProps) {
  const statusColor = {
    urgente: 'text-red-600',
    disponivel: 'text-green-600',
    concluido: 'text-gray-500',
    encerrado: 'text-gray-700',
    reservado: 'text-yellow-600'
  }

  const statusLabel = {
    urgente: 'URGENTE',
    disponivel: 'DISPONÍVEL',
    concluido: 'CONCLUÍDO',
    encerrado: 'ENCERRADO',
    reservado: 'RESERVADO'
  }

  const cardContent = (
    <div className="bg-white shadow rounded-xl p-6 mb-4 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-[#0C3B5D]">{title}</h2>
        {status && (
          <span className={`text-xs font-bold uppercase ${statusColor[status]}`}>
            {statusLabel[status]}
          </span>
        )}
      </div>
      {description && (
        <p className="text-gray-700 text-sm mb-2">{description}</p>
      )}

      {subtitle && (
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
      )}

      {tags && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {children}

      {autor && (
        <p className="text-xs text-gray-500">
          Publicado por: {autor} {hora && `• ${hora}`}
        </p>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        {cardContent}
      </Link>
    )
  }

  if (id) {
    return (
      <Link href={`/doacoes/${id}`}>
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
