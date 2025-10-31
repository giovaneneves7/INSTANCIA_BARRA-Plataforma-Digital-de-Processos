"use client"

import { Footer } from "../components/Footer"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import TeskCard from "../components/TeskCard"
import TeskCardDescription from "../components/TeskCardDescription"
import { useParams, useNavigate } from "react-router-dom"
import { ProcessService } from "../features/process/domain/services/ProcessService"
import { ArrowLeft } from "lucide-react"
import WhatsappFloatingButton from "../components/WhatsappFloatingButton"

function ProcessActivity() {
  const { activity_id } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await ProcessService.getActivityById(Number(activity_id))
        setActivity(data[0])
      } catch (error) {
        console.error("Erro ao carregar atividade:", error)
      } finally {
        setLoading(false)
      }
    }

    if (activity_id) {
      fetchData()
    }
  }, [activity_id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando atividade...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-600">Atividade não encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <WhatsappFloatingButton />

      <main className="animate-fade-in">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-orange-600 hover:text-purple-800 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>

        <TeskCard order={activity.order} name={activity.name} description={activity.description} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <TeskCardDescription 
            title="documento" 
            description={activity.documents_folder_url} 
          />
          <TeskCardDescription 
            title="leis" 
            description={activity.laws && activity.laws.trim() !== "" ? activity.laws : "Nenhuma lei aplicável"} 
          />
          <TeskCardDescription
            title="regulamento"
            description={activity.regulations && activity.regulations.trim() !== "" ? activity.regulations : "Nenhum regulamento aplicável"}
          />
          <TeskCardDescription
            title="responsável"
            description={activity.responsible_person && activity.responsible_person.trim() !== "" ? activity.responsible_person : "Nenhum responsável incluido"}
          />
          <TeskCardDescription
            title="comentários"
            description={activity.comments && activity.comments.trim() !== "" ? activity.comments : "Nenhum comentário adicionado"}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProcessActivity
