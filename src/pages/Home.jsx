"use client"

import "../App.css"
import CategorizedList from "../components/CategorizedList"
import { Footer } from "../components/Footer"
import { ProcessService } from "../features/process/domain/services/ProcessService"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FilterDrawer from "../components/FilterDrawer"
import Header from "../components/Header"
import SearchBar from "../components/Searchbar"
import Spacer from "../utils/Spacer"
import WhatsappFloatingButton from "../components/WhatsappFloatingButton"

/*
* @author Giovane Neves
*/
function Home() {
  const [allSecretariats, setAllSecretariats] = useState([])
  const [allSectors, setAllSectors] = useState([])
  const [allProcesses, setAllProcesses] = useState([])
  const [secretariats, setSecretariats] = useState([])
  const [sectors, setSectors] = useState([])
  const [processes, setProcesses] = useState([])
  const [selectedSecretariat, setSelectedSecretariat] = useState(null)
  const [selectedSector, setSelectedSector] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    ProcessService.listAllSecretariats()
      .then((data) => {
        setAllSecretariats(data)
        setSecretariats(data)
      })
      .catch(console.error)
  }, [])

  // Search filter functions
  const filteredSecretariats = secretariats.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredSectors = sectors.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredProcesses = processes.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))


  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleApplyFilters = async () => {
    if (selectedSecretariat) {
      const sectors = await ProcessService.listSectorsBySecretariatId(selectedSecretariat)
      setAllSectors(sectors)
      setSectors(sectors)

      if (selectedSector) {
        const processes = await ProcessService.listProcessesBySectorId(selectedSector)
        setAllProcesses(processes)
        setProcesses(processes)
      } else {
        setAllProcesses([])
        setProcesses([])
      }
    } else {
      // Nenhuma secretaria selecionada — limpa tudo
      setAllSectors([])
      setSectors([])
      setAllProcesses([])
      setProcesses([])
    }

    setIsFilterOpen(false)
  }

  // Handle functions
  const handleSecretariatClick = (id) => {
    setSelectedSecretariat(id)
    setSearchTerm("")
    ProcessService.listSectorsBySecretariatId(id)
      .then((data) => {
        setAllSectors(data)
        setSectors(data)
      })
      .catch(console.error)
    setProcesses([])
  }

  const handleSectorClick = (id) => {
    setSelectedSector(id)
    setSearchTerm("")
    ProcessService.listProcessesBySectorId(id)
      .then((data) => {
        setAllProcesses(data)
        setProcesses(data)
      })
      .catch(console.error)
  }

  const handleProcessClick = (id) => {
    navigate(`/processes/process/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="animate-fade-in">
        <Spacer size="lg" />

        {/* Hero Section */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Consulte Processos Municipais</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acesse informações sobre processos administrativos de forma rápida e transparente
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onFilterClick={() => setIsFilterOpen(true)}
        />

        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
          allSecretariats={allSecretariats}
          allSectors={allSectors}
          selectedSecretariat={selectedSecretariat}
          selectedSector={selectedSector}
          setSelectedSecretariat={setSelectedSecretariat}
          setSelectedSector={setSelectedSector}
        />

        <Spacer size="xl" />

        <CategorizedList
          secretariats={filteredSecretariats}
          sectors={filteredSectors}
          processes={filteredProcesses}
          onSecretariatClick={handleSecretariatClick}
          onSectorClick={handleSectorClick}
          selectedSecretariat={selectedSecretariat}
          selectedSector={selectedSector}
          onProcessClick={handleProcessClick}
        />

        <Spacer size="xl" />
      </main>
      <Footer />
    </div>
  )
}

export default Home
