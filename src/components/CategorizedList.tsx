"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Building2, Users, FileText } from "lucide-react"

interface Item {
  id: number
  name: string
}

interface CategorizedListProps {
  secretariats: Item[]
  sectors: Item[]
  processes: Item[]
  onSecretariatClick: (id: number) => void
  onSectorClick: (id: number) => void
  onProcessClick: (id: number) => void
  selectedSecretariat: number | null
  selectedSector: number | null
}

const CategorizedList = ({
  secretariats,
  sectors,
  processes,
  onSecretariatClick,
  onSectorClick,
  onProcessClick,
  selectedSecretariat,
  selectedSector,
}: CategorizedListProps) => {
  const [expanded, setExpanded] = useState({
    SECRETARIAS: false,
    SETORES: false,
    PROCESSOS: false,
  })

  const expandToggle = (category: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const categories = [
    {
      title: "SECRETARIAS",
      items: secretariats,
      icon: Building2,
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "SETORES",
      items: sectors,
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      hoverColor: "hover:bg-blue-100",
    },
    {
      title: "PROCESSOS",
      items: processes,
      icon: FileText,
      color: "yellow",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      hoverColor: "hover:bg-yellow-100",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map(({ title, items, icon: Icon, bgColor, borderColor, textColor, hoverColor }) => {
          const mostrarTodos = expanded[title as keyof typeof expanded]
          const itensExibidos = mostrarTodos ? items : items.slice(0, 8)

          return (
            <div
              key={title}
              className={`${bgColor} ${borderColor} border-2 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 ${textColor} bg-white rounded-lg shadow-sm`}>
                  <Icon size={24} />
                </div>
                <h2 className={`${textColor} font-bold text-xl uppercase tracking-wide`}>{title}</h2>
              </div>

              {items.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  {title === "SETORES"
                    ? "Selecione uma secretaria"
                    : title === "PROCESSOS"
                      ? "Selecione um setor"
                      : "Nenhum item encontrado"}
                </p>
              ) : (
                <>
                  <ul className="space-y-2">
                    {itensExibidos.map((item) => {
                      const isSelected =
                        (title === "SECRETARIAS" && item.id === selectedSecretariat) ||
                        (title === "SETORES" && item.id === selectedSector)

                      return (
                        <li
                          key={item.id}
                          className={`
                            cursor-pointer p-3 rounded-lg transition-all duration-200 text-sm
                            ${
                              isSelected
                                ? "bg-white shadow-md border-2 border-orange-300 text-orange-700 font-semibold"
                                : `${hoverColor} hover:shadow-sm text-gray-700 hover:text-gray-900`
                            }
                          `}
                          onClick={() => {
                            if (title === "SECRETARIAS") {
                              onSecretariatClick(item.id)
                            } else if (title === "SETORES") {
                              onSectorClick(item.id)
                            } else if (title === "PROCESSOS") {
                              onProcessClick(item.id)
                            }
                          }}
                        >
                          {item.name.toUpperCase()}
                        </li>
                      )
                    })}
                  </ul>

                  {items.length > 8 && (
                    <button
                      onClick={() => expandToggle(title as keyof typeof expanded)}
                      className={`mt-4 ${textColor} bg-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-sm transition-all duration-200 text-sm font-medium border ${borderColor}`}
                    >
                      {mostrarTodos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      {mostrarTodos ? "Ver Menos" : `Ver Todos (${items.length})`}
                    </button>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategorizedList
