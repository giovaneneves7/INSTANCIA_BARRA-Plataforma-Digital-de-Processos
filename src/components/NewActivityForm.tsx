import { useState, useEffect } from "react";
import { ProcessService } from "../features/process/domain/services/ProcessService";


type Secretariat = { id: number; name: string };
type Sector = { id: number; name: string; secretariat_id: number };
type Process = { id: number; name: string; sector_id: number };


const NewActivityForm = ({ onClose }: { onClose: () => void }) => {
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    laws: "",
    process_id: 0,
    order: 0,
    responsible_person: "",
    comments: "",
    regulations: "",
    svg_element_id: "",
    documents_folder_url: ""
  });

  const [secretariats, setSecretariats] = useState<Secretariat[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [secretariatsData, sectorsData, processesData] = await Promise.all([
        ProcessService.listAllSecretariats(),
        ProcessService.listAllSectors(),
        ProcessService.listAllProcesses(),
      ]);
      setSecretariats(secretariatsData);
      setSectors(sectorsData);
      setProcesses(processesData);
    }
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "process_id" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      await ProcessService.createActivity(formData);

      alert("Atividade cadastrada com sucesso!");
      setFormData({
        name: "",
        description: "",
        laws: "",
        process_id: 0,
        order: 0,
        responsible_person: "",
        comments: "",
        regulations: "",
        svg_element_id: "",
        documents_folder_url: ""
      });
      onClose();
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao cadastrar atividade.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mt-8 mx-auto pb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
          <h2 className="text-2xl font-bebas text-white">Cadastro de Atividade</h2>
          <p className="text-gray-300 mt-1">Preencha os dados da nova atividade do processo</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Nome e SVG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Nome da Atividade</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nome"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">ID do Elemento SVG</label>
              <input
                name="svg_element_id"
                value={formData.svg_element_id}
                onChange={handleChange}
                required
                placeholder="Ex: activity-1"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
          </div>

          {/* Descrição e Leis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrição da atividade"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 h-24 resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Leis Aplicáveis</label>
              <textarea
                name="laws"
                value={formData.laws}
                onChange={handleChange}
                placeholder="Ex: Lei nº 1234/2020"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 h-24 resize-none"
              />
            </div>
          </div>

          {/* Processo */}
<div>
  <label className="text-sm font-semibold text-gray-700">Processo</label>
  <select
    name="process_id"
    value={formData.process_id}
    onChange={handleChange}
    required
    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
  >
    <option value={0} disabled>
      Selecione um processo
    </option>

    {secretariats.map((sec) =>
      sectors
        .filter((sector) => sector.secretariat_id === sec.id)
        .map((sector) => (
          <optgroup key={sector.id} label={`${sec.name} / ${sector.name}`}>
            {processes
              .filter((proc) => proc.sector_id === sector.id)
              .map((proc) => (
                <option key={proc.id} value={proc.id}>
                  {proc.name}
                </option>
              ))}
          </optgroup>
        ))
    )}

  </select>
</div>

{/* Ordem e Responsável */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
  <div>
    <label className="text-sm font-semibold text-gray-700">Ordem</label>
    <input
      name="order"
      type="number"
      value={formData.order}
      onChange={handleChange}
      required
      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
    />
  </div>

  <div>
    <label className="text-sm font-semibold text-gray-700">Pessoa Responsável</label>
    <input
      name="responsible_person"
      value={formData.responsible_person}
      onChange={handleChange}
      placeholder="Nome do responsável"
      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
    />
  </div>

  <div>
    <label className="text-sm font-semibold text-gray-700">Documentos</label>
    <input
      name="documents_folder_url"
      value={formData.documents_folder_url}
      onChange={handleChange}
      placeholder="Link da pasta com documentos"
      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
    />
  </div>
</div>


          {/* Comentários e Regulamentações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Comentários</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Comentários adicionais"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 h-24 resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Regulamentações</label>
              <textarea
                name="regulations"
                value={formData.regulations}
                onChange={handleChange}
                placeholder="Detalhes de regulamentações"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 h-24 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar Atividade"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewActivityForm;
