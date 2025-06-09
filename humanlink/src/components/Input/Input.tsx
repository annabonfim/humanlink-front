

'use client'

import { InputHTMLAttributes } from 'react'

type InputProps = {
  label: string
  name: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({ label, name, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B5D] text-gray-900"
        {...props}
      />
    </div>
  )
}