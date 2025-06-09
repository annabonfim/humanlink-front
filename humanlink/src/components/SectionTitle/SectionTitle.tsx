'use client'

import { ReactNode } from 'react'

type SectionTitleProps = {
  children?: ReactNode
  title?: string
  subtitle?: string
}

export default function SectionTitle({ children, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-[#0C3B5D] border-b border-gray-200 pb-2">
        {children ?? title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      )}
    </div>
  )
}
