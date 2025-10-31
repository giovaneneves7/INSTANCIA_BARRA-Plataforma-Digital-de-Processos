import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { Activity } from "../features/process/domain/models/Activity"
import SVGProcessViewer from "../utils/SVGProcessViewer"

type ImageProcessProps = {
  imageUrl: string
  sheetImageUrl?: string
  activities: Activity[]
}

const ImageProcess = ({ imageUrl, sheetImageUrl, activities }: ImageProcessProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Dropdown 1: Fluxo do Processo */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">Fluxo do Processo</h2>
            {isOpen ? (
              <ChevronUp className="text-white" size={24} />
            ) : (
              <ChevronDown className="text-white" size={24} />
            )}
          </div>
          <p className="text-green-100 mt-1 hidden sm:block">Clique para expandir/recolher</p>
        </div>

        {isOpen && (
          <div className="p-8 bg-gray-50">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <SVGProcessViewer svgUrl={imageUrl} activities={activities} />
            </div>
          </div>
        )}
      </div>

      {/* Dropdown 2: Planilha do Processo */}
      {sheetImageUrl && (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div
            className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-6 flex items-center justify-between cursor-pointer"
            onClick={() => setIsSheetOpen(!isSheetOpen)}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">Planilha do Processo</h2>
              {isSheetOpen ? (
                <ChevronUp className="text-white" size={24} />
              ) : (
                <ChevronDown className="text-white" size={24} />
              )}
            </div>
            <p className="text-green-100 mt-1 hidden sm:block">Clique para visualizar/ocultar</p>
          </div>

          {isSheetOpen && (
            <div className="p-8 bg-gray-50">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <img
                  src={sheetImageUrl}
                  alt="Planilha do processo"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          )}
        </div>
      )}
      
    </div>
  )
}

export default ImageProcess
