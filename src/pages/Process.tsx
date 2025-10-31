"use client"

import { useEffect, useState } from "react"
import "../App.css"
import { Footer } from "../components/Footer"
import Header from "../components/Header"
import ImageProcess from "../components/ImageProcess"
import ProcessDescription from "../components/ProcessDescription"
import { useParams, useNavigate } from "react-router-dom"
import { ProcessService } from "../features/process/domain/services/ProcessService"
import type { Activity } from "../features/process/domain/models/Activity"
import { ArrowLeft } from "lucide-react"
import WhatsappFloatingButton from "../components/WhatsappFloatingButton"

function Process() {
  const { process_id } = useParams()
  const navigate = useNavigate()
  const [process, setProcess] = useState<any | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [processData, activitiesData] = await Promise.all([
          ProcessService.getProcessById(Number(process_id)),
          ProcessService.getActivitiesByProcessId(Number(process_id)),
        ])

        setProcess(processData[0])
        setActivities(activitiesData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    if (process_id) {
      fetchData()
    }
  }, [process_id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando processo...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!process) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-600">Processo não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WhatsappFloatingButton />
      <Header />
      <main className="animate-fade-in">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Voltar para início
          </button>
        </div>

        <ImageProcess 
          imageUrl={process.image_url}  
          sheetImageUrl={process.sheet_image_url}
          activities={activities} 
        />
        <ProcessDescription 
          resume={process.resume} 
          laws={process.laws}
          fileName={process.file_name}
          fileUrl={process.file_url}
          responsible_person={process.responsible_person}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Process
