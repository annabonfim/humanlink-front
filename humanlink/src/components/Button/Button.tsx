'use client'

import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-semibold transition-colors'
  const variants = {
    primary: 'bg-[#0C3B5D] text-white hover:bg-[#0a2f4a]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  )
}
