import { FileText, Scale, Settings, User, MessageSquare } from "lucide-react"

/*
* @author Caio Alves, Giovane Neves
*/
type TeskCardDescriptionProps = {
  title: string
  description: string
}

const getIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "documento":
      return FileText
    case "leis":
      return Scale
    case "regulamento":
      return Settings
    case "responsável":
      return User
    case "comentários":
      return MessageSquare
    default:
      return FileText
  }
}

const getColor = (title: string) => {
  switch (title.toLowerCase()) {
    case "documento":
      return "orange"
    case "leis":
      return "orange"
    case "regulamento":
      return "orange"
    case "responsável":
      return "orange"
    case "comentários":
      return "orange"
    default:
      return "orange"
  }
}

function TeskCardDescription({ title, description }: TeskCardDescriptionProps) {
  const IconComponent = getIcon(title)
  const color = getColor(title)

  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 bg-${color}-100 text-${color}-600 rounded-lg`}>
            <IconComponent size={20} />
          </div>
          <h3 className="font-bold uppercase text-lg text-gray-800 tracking-wide">{title}</h3>
        </div>
        {title.toLowerCase() === "documento" && description ? (
          <a
            href={description}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 underline hover:text-purple-800 transition-colors duration-200"
          >
            Acessar Documento
          </a>
        ) : (
          <p className="text-gray-700 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}

export default TeskCardDescription
