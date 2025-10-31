import { useEffect, useState } from "react";
import { ProcessService } from "../features/process/domain/services/ProcessService";

interface EditSectorFormProps {
  sector: any;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

/*
* @author Giovane Neves
*/
const EditSectorForm = ({ sector, onClose, onUpdateSuccess }: EditSectorFormProps) => {
  const [name, setName] = useState(sector.name);
  const [secretariatId, setSecretariatId] = useState(sector.secretariat_id.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secretariats, setSecretariats] = useState<any[]>([]);

  useEffect(() => {
    const fetchSecretariats = async () => {
      try {
        const data = await ProcessService.listAllSecretariats();
        setSecretariats(data);
      } catch (e) {
        console.error("Erro ao obter secretarias:", e);
      }
    };
    fetchSecretariats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        await ProcessService.updateSector(
            sector.id,
            {
                name,
                secretariat_id: parseInt(secretariatId),
            }
        );

        alert("Setor atualizado com sucesso!");
      onUpdateSuccess();
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar setor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mt-8 mx-auto pb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 px-8 py-6">
          <h2 className="text-2xl font-bebas text-white">Editar Setor</h2>
          <p className="text-purple-200 mt-1">Atualize os dados do setor</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-4 mb-6">
            <label className="text-sm font-semibold text-gray-700">Nome do Setor</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              placeholder="Ex: Departamento de RH"
              required
            />
          </div>

          <div className="space-y-4 mb-6">
            <label className="text-sm font-semibold text-gray-700">Secretaria</label>
            <select
              value={secretariatId}
              onChange={(e) => setSecretariatId(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
            >
              <option value="">Selecione uma secretaria</option>
              {secretariats.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-all"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSectorForm;
