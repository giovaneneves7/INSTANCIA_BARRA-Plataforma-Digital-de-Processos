"use client"

import type { ReactElement } from "react"

interface SearchBarProps {
  searchTerm: string
  onSearchTermChange: (value: string) => void
  onFilterClick: () => void
}

export default function SearchBar({ searchTerm, onSearchTermChange, onFilterClick }: SearchBarProps): ReactElement {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        {/* ...input... */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Busque por processos, secretarias ou setores..."
          className="w-full py-4 pl-12 pr-16 bg-white border-2 rounded-xl shadow-sm"
        />

        {/* Botão de Filtro */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <button onClick={onFilterClick} className="p-2 text-gray-400 hover:text-blue-600">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
