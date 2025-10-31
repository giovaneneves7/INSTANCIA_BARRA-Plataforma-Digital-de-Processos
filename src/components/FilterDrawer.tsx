/*
* @author Giovane Neves
*/
function FilterDrawer({
  isOpen,
  onClose,
  onApply,
  allSecretariats,
  allSectors,
  selectedSecretariat,
  selectedSector,
  setSelectedSecretariat,
  setSelectedSector,
}: any) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-end">
      <div className="bg-white w-80 p-4 shadow-lg h-full">
        <h2 className="text-lg font-bold mb-4">Filtros</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Secretaria</label>
          <select
            className="w-full border px-2 py-1 rounded"
            value={selectedSecretariat || ""}
            onChange={(e) => setSelectedSecretariat(Number(e.target.value) || null)}
          >
            <option value="">Todas</option>
            {allSecretariats.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Setor</label>
          <select
            className="w-full border px-2 py-1 rounded"
            value={selectedSector || ""}
            onChange={(e) => setSelectedSector(Number(e.target.value) || null)}
          >
            <option value="">Todos</option>
            {allSectors.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button className="text-sm text-blue-600 hover:underline" onClick={onApply}>
            Aplicar filtros
          </button>
          <button
            className="text-sm text-red-500 hover:underline"
            onClick={() => {
              setSelectedSecretariat(null)
              setSelectedSector(null)
              onApply()
            }}
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* Click to close outside */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  )
}

export default FilterDrawer;