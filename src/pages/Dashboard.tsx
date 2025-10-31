"use client"

import Header from "../components/Header"
import { Footer } from "../components/Footer"
import { Plus, X } from "lucide-react"
import { useState, useEffect } from "react";
import NewSecretariatForm from "../components/NewSecretariatForm"
import NewSectorForm from "../components/NewSectorForm"
import NewActivityForm from "../components/NewActivityForm"
import NewProcessForm from "../components/NewProcessForm"
import AdminTable from "../components/AdminTable";
import EditSecretariatForm from "../components/EditSecretariatForm";
import EditSectorForm from "../components/EditSectorForm";
import { ProcessService } from "../features/process/domain/services/ProcessService";

interface DashboardData {
  secretariats: any[]; 
  sectors: any[];
  processes: any[];
  activities: any[];
}

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false)
  const [showSecretariatForm, setShowSecretariatForm] = useState(false)
  const [showSectorForm, setShowSectorForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [data, setData] = useState<DashboardData>({
    secretariats: [],
    sectors: [],
    processes: [],
    activities: [],
  });
  const [editingSecretariat, setEditingSecretariat] = useState<any | null>(null);
  const [editingSector, setEditingSector] = useState<any | null>(null);




  useEffect(() => {
    const fetchData = async () => {
      const [secretariats, sectors, processes, activities] = await Promise.all([
        ProcessService.listAllSecretariats(),
        ProcessService.listAllSectors(),
        ProcessService.listAllProcesses(),
        ProcessService.listAllActivities()
      ]);

      setData({ secretariats, sectors, processes, activities });
    };

    fetchData();
  }, []);


  const handleDelete = async (type: string, id: number) => {
    switch (type) {
      case "secretariats":
        await ProcessService.deleteSecretariatById(id);
        break;
      case "sectors":
        await ProcessService.deleteSectorById(id);
        break;
      case "processes":
        await ProcessService.deleteProcessById(id);
        break;
      case "activities":
        await ProcessService.deleteActivityById(id);
        break;
      default:
        return;
    }

    // Atualiza os dados
    const [secretariats, sectors, processes, activities] = await Promise.all([
        ProcessService.listAllSecretariats(),
        ProcessService.listAllSectors(),
        ProcessService.listAllProcesses(),
        ProcessService.listAllActivities()
    ]);

    setData({ secretariats, sectors, processes, activities });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bebas mb-4">Painel Administrativo</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Gerencie processos municipais de forma eficiente e transparente
            </p>
          </div>
        </div>

        {/* Botões */}
        <div className="text-center my-8">
          <div className="flex flex-wrap justify-center gap-4">
            {/* Secretaria */}
            <button
              onClick={() => {
                setShowSecretariatForm(true)
                setShowSectorForm(false)
                setShowForm(false)
                setShowActivityForm(false)
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Cadastrar Secretaria
            </button>

            {/* Setor */}
            <button
              onClick={() => {
                setShowSectorForm(true)
                setShowSecretariatForm(false)
                setShowForm(false)
                setShowActivityForm(false)
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
            <Plus className="h-5 w-5 mr-2" />
              Cadastrar Setor
            </button>

            {/* Processo */}
            <button
              onClick={() => {
                setShowForm(!showForm)
                setShowSecretariatForm(false)
                setShowSectorForm(false)
                setShowActivityForm(false)
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {showForm ? (
                <>
                  <X className="h-5 w-5 mr-2" />
                  Cancelar
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Cadastrar Processo
                </>
              )}
            </button>
            {/* Atividade */}
            <button
              onClick={() => {
                setShowActivityForm(true)
                setShowSectorForm(false)
                setShowSecretariatForm(false)
                setShowForm(false)
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
            <Plus className="h-5 w-5 mr-2" />
              Cadastrar Atividade
            </button>
          </div>


          {/* Formulários (somente um por vez) */}
          {showSecretariatForm && (
            <NewSecretariatForm onClose={() => setShowSecretariatForm(false)} />
          )}
          {showSectorForm && (
            <NewSectorForm onClose={() => setShowSectorForm(false)} />
          )} 
          {showActivityForm && (
            <NewActivityForm onClose={() => setShowActivityForm(false)} />
          )}
        </div>

        {/* Formulário de Processo */}
        {showForm && (
          <NewProcessForm onClose={() => setShowForm(false) }/>
        )}

        {/* Formulários de Edição */}
        {editingSecretariat && (
          <EditSecretariatForm
            secretariat={editingSecretariat}
            onClose={() => setEditingSecretariat(null)}
            onUpdateSuccess={async () => {
              // Recarregar lista após update
              const secretariats = await ProcessService.listAllSecretariats();
              setData((prev) => ({ ...prev, secretariats }));
              setEditingSecretariat(null);
            }}
          />
        )}
        {editingSector && (
          <EditSectorForm
            sector={editingSector}
            onClose={() => setEditingSector(null)}
            onUpdateSuccess={async () => {
              const sectors = await ProcessService.listAllSectors();
              setData((prev) => ({ ...prev, sectors }));
              setEditingSector(null);
            }}
          />
        )}


        <AdminTable
          title="Secretarias"
          data={data.secretariats}
          fields={["id", "name"]}
          type="secretariats"
          onDelete={handleDelete}
          onEdit={(type, item) => {
            if (type === "secretariats") {
              setEditingSecretariat(item);
              setShowSecretariatForm(false);
              setShowSectorForm(false);
              setShowForm(false);
              setShowActivityForm(false);
            }
          }}
        />

        <AdminTable
          title="Setores"
          data={data.sectors}
          fields={["id", "name", "secretariat_id"]}
          type="sectors"
          onDelete={handleDelete}
          onEdit={(type, item) => {
            if (type === "sectors") {
              setEditingSector(item);
              setShowSecretariatForm(false);
              setShowSectorForm(false);
              setShowForm(false);
              setShowActivityForm(false);
            }
          }}
        />

        <AdminTable
          title="Processos"
          data={data.processes}
          fields={["id", "name", "sector_id"]}
          type="processes"
          onDelete={handleDelete}
          onEdit={(type, item) => console.log("Editar:", type, item)}
        />

        <AdminTable
          title="Atividades"
          data={data.activities}
          fields={["id", "name", "process_id"]}
          type="activities"
          onDelete={handleDelete}
          onEdit={(type, item) => console.log("Editar:", type, item)}
        />

      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
