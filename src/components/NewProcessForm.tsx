import { useState, useEffect } from "react";
import { ProcessService } from "../features/process/domain/services/ProcessService";
import { Upload, FileText, FolderOpen, User, Plus, Scale } from "lucide-react";

type Props = { onClose: () => void }

/*
* @author Giovane Neves
*/
const NewProcessForm = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    resume: "",
    sector_id: 0, 
    responsible_person: "",
    file_name: "",
    file_url: "",
    laws: ""
  });
  
  const [sectors, setSectors] = useState<{ id: number; name: string; secretariat_id: number }[]>([]);
  const [secretariats, setSecretariats] = useState<{ id: number; name: string}[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sheetImageFile, setSheetImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
	  async function loadData() {
      const [sectorsData, secretariatsData] = await Promise.all([
        ProcessService.listAllSectors(),
        ProcessService.listAllSecretariats(),
      ]);

      setSectors(sectorsData);
      setSecretariats(secretariatsData);
    }

    loadData();
  }, []);
  
	const handleChange = (
	  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
	  const { name, value } = e.target;
	  setFormData(prev => ({ ...prev, [name]: value }));
	};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await ProcessService.createProcess({
        ...formData,
        image: imageFile,
        sheetImage: sheetImageFile,
      });

      alert("Processo cadastrado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar processo:", error);
      alert("Erro ao cadastrar processo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
          <h2 className="text-2xl font-bebas text-white flex items-center">
            <FileText className="h-6 w-6 mr-3" />
            Cadastro de Processo
          </h2>
          <p className="text-gray-300 mt-1">Preencha as informações do novo processo</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          
			{/* Nome do Processo */}
			<div className="space-y-2 mb-6">
			  <label className="text-sm font-semibold text-gray-700">
			    Nome do Processo
			  </label>
			  <input
			    name="name"
			    value={formData.name}
			    onChange={handleChange}
			    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
			    placeholder="Ex: Abertura de Licitação"
			    required
			  />
			</div>
      {/* Setor */}
        <select
            name="sector_id"
            value={formData.sector_id}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
            required
          >
            <option value={0} disabled>Selecione um setor</option>
            {secretariats.map((secretariat) => (
              <optgroup key={secretariat.id} label={secretariat.name}>
                {sectors
                  .filter((sector) => sector.secretariat_id === secretariat.id)
                  .map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          {/* Resumo */}
          <div className="space-y-2 mb-6">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FolderOpen className="h-4 w-4 mr-2 text-purple-600" />
              Resumo do Processo
            </label>
            <textarea
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
              placeholder="Descreva brevemente o processo"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nome do Arquivo */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Nome do Arquivo
              </label>
              <input
                name="file_name"
                value={formData.file_name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                placeholder="Ex: contrato-obra-2025.pdf"
                required
              />
            </div>

            {/* URL do Arquivo */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                URL do Arquivo
              </label>
              <input
                name="file_url"
                value={formData.file_url}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                placeholder="https://exemplo.com/arquivo.pdf"
                type="url"
                required
              />
            </div>
          </div>

          {/* Imagem da planilha */}
          <div className="space-y-2 mb-6">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Upload className="h-4 w-4 mr-2 text-blue-600" />
              Imagem da Planilha
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSheetImageFile(e.target.files?.[0] || null)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 text-center hover:border-blue-400"
            />
            {sheetImageFile && (
              <p className="text-sm text-green-600 mt-1">{sheetImageFile.name}</p>
            )}
          </div>

          {/* Imagem */}
          <div className="space-y-2 mb-6">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Upload className="h-4 w-4 mr-2 text-blue-600" />
              Imagem do Processo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 text-center hover:border-blue-400"
            />
            {imageFile && (
              <p className="text-sm text-green-600 mt-1">{imageFile.name}</p>
            )}
          </div>

          {/* Responsável */}
          <div className="space-y-2 mb-8">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <User className="h-4 w-4 mr-2 text-gray-600" />
              Pessoa Responsável
            </label>
            <input
              name="responsible_person"
              value={formData.responsible_person}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
              placeholder="Ex: Maria Souza"
              required
            />
          </div>
          {/* Leis */}
          <div className="space-y-2 mb-8">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Scale className="h-4 w-4 mr-2 text-gray-600" />
              Leis
            </label>
            <input
              name="laws"
              value={formData.laws}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
              placeholder="Ex: Lei nº 14.133"
              required
            />
          </div>


          {/* Botão de Envio */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Cadastrando...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Cadastrar Processo
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProcessForm;
