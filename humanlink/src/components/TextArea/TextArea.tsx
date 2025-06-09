

'use client'

import { TextareaHTMLAttributes } from 'react'

type TextareaProps = {
  label: string
  name: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea({ label, name, ...props }: TextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B5D] resize-none"
        {...props}
      />
    </div>
  )
}