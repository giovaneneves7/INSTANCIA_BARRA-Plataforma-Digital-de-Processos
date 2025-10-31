import { FileText, Scale, User, SquareArrowOutUpRight, Info,  } from "lucide-react"

interface ProcessDescriptionProps {
  resume: string;
  laws: string;
  fileName: string;
  fileUrl: string;
  responsible_person: string;
}
const ProcessDescription = ({resume, laws, fileName, fileUrl, responsible_person} : ProcessDescriptionProps) => {

  const description = [
    {
      titulo: "RESUMO",
      tipo: "texto",
      icon: Info,
      conteudo: resume,
    },
    {
      titulo: "DOCUMENTO",
      tipo: "arquivo",
      icon: FileText,
      arquivo: {
        nome: fileName,
        url: fileUrl,
      },
    },
    {
      titulo: "LEIS",
      tipo: "texto",
      icon: Scale,
      conteudo: laws,
    },
    {
      titulo: "RESPONSÁVEL",
      tipo: "texto",
      icon: User,
      conteudo: responsible_person,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Informações do Processo</h2>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {description.map((section, idx) => {
              const IconComponent = section.icon

              return (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">{section.titulo}</h3>
                  </div>

                  {section.tipo === "texto" && <p className="text-gray-700 leading-relaxed">{section.conteudo}</p>}

                  {section.tipo === "arquivo" && (
                    <a
                      href={section.arquivo?.url}
                      className="inline-flex items-center gap-2 text-orange-600 hover:text-blue-orange hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                    >
                      <SquareArrowOutUpRight size={16} />
                      {section.arquivo?.nome}
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessDescription
