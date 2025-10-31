import { useState, useEffect } from "react";
import { ProcessService } from "../features/process/domain/services/ProcessService";

interface Secretariat {
  id: number;
  name: string;
}

interface EditSecretariatFormProps {
  secretariat: Secretariat;
  onClose: () => void;
  onUpdateSuccess?: () => void; 
}

/*
* @author Giovane Neves
*/
const EditSecretariatForm = ({ secretariat, onClose, onUpdateSuccess }: EditSecretariatFormProps) => {
  const [name, setName] = useState(secretariat.name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(secretariat.name);
  }, [secretariat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await ProcessService.updateSecretariat(secretariat.id, { name });
      alert("Secretaria atualizada com sucesso!");
      onUpdateSuccess?.();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar secretaria:", err);
      alert("Erro ao atualizar secretaria.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mt-8 mx-auto pb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
          <h2 className="text-2xl font-bebas text-white">Editar Secretaria</h2>
          <p className="text-gray-300 mt-1">Atualize o nome da secretaria</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-4 mb-6">
            <label className="text-sm font-semibold text-gray-700">Nome da Secretaria</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Ex: Secretaria de Saúde"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSecretariatForm;
