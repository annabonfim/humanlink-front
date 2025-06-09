'use client'

import { SelectHTMLAttributes } from 'react'

type SelectProps = {
  label: string
  name: string
  options: { label: string; value: string }[]
} & SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ label, name, options, ...props }: SelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B5D] bg-white"
        {...props}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}