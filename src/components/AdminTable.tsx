import { useState } from "react";
import { Pencil, Trash2, MoreVertical, ChevronUp, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type EntityType = 'secretariats' | 'sectors' | 'processes' | 'activities';

interface AdminTableProps {
  title: string;
  data: any[];
  fields: string[];
  type: EntityType;
  onDelete: (type: EntityType, id: number) => void;
  onEdit: (type: EntityType, item: any) => void;
}

/*
* @author Giovane
*/
export default function AdminTable({
  title,
  data,
  fields,
  type,
  onDelete,
  onEdit
}: AdminTableProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={() => setIsVisible(!isVisible)} className="p-1 rounded hover:bg-gray-200">
          {isVisible ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isVisible && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {fields.map((field) => (
                  <th key={field} className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    {field}
                  </th>
                ))}
                <th className="px-6 py-3 text-sm font-medium text-gray-700 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id}>
                  {fields.map((field) => (
                    <td key={field} className="px-6 py-4 text-sm text-gray-800">{item[field]}</td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="p-1 rounded hover:bg-gray-200">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="bg-white rounded shadow-md p-1 z-50">
                        <DropdownMenu.Item
                          onSelect={() => onEdit(type, item)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <Pencil size={14} /> Editar
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          onSelect={() => onDelete(type, item.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 size={14} /> Deletar
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={fields.length + 1} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum dado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
