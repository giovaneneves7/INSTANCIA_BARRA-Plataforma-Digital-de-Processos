import { Activity } from "lucide-react"

type TaskCardProps = {
  name: string
  order: number
  description: string
}

/*
* @author Caio Alves
*/
function TeskCard({ name, order, description }: TaskCardProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Detalhes da Atividade</h2>
        </div>

        <div className="p-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Activity Card */}
            <div className="flex-shrink-0">
              <div className="w-48 h-32 rounded-xl border-2 border-blue-300 bg-purple-50 flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="text-blue-600" size={20} />
                  <span className="text-blue-600 font-bold text-lg">{order}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 text-center leading-tight">{name}</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold uppercase text-xl text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded"></div>
                  Descrição
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeskCard
