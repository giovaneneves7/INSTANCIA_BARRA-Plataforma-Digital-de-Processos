import { useState, useEffect } from "react"
import { ProcessService } from "../features/process/domain/services/ProcessService"

/*
* @author Giovane Neves
*/
const NewSectorForm = ({ onClose }: { onClose: () => void }) => {
  const [setor, setSetor] = useState("")
  const [secretariaId, setSecretariaId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [secretarias, setSecretarias] = useState<any[]>([]);


  useEffect(() => {
    const fetchSecretarias = async () => {
      
      try{
      const data = await ProcessService.listAllSecretariats();
      setSecretarias(data);
    } catch(e){
        console.log("Erro ao obter secretarias:", e);
      }

    };

    fetchSecretarias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await ProcessService.createSector(setor, parseInt(secretariaId));
      alert("Setor cadastrado com sucesso!")
      setSetor("")
      setSecretariaId("")
      onClose()
    } catch (err) {
      console.error("Erro:", err)
      alert("Erro ao cadastrar setor.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mt-8 mx-auto pb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
          <h2 className="text-2xl font-bebas text-white">Cadastro de Setor</h2>
          <p className="text-gray-300 mt-1">Insira os dados do novo setor</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-4 mb-6">
            <label className="text-sm font-semibold text-gray-700">Nome do Setor</label>
            <input
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              placeholder="Ex: Departamento de Tecnologia"
              required
            />
          </div>

        <div className="space-y-4 mb-6">
          <label className="text-sm font-semibold text-gray-700">Secretaria</label>
          <select
            value={secretariaId}
            onChange={(e) => setSecretariaId(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            required
          >
            <option value="">Selecione uma secretaria</option>
            {secretarias.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar Setor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewSectorForm
