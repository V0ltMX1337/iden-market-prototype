import React, { useState } from "react"

type CellPurpose = "dropoff" | "storage"

interface OrderInCell {
  id: string
  expiryDate: string
  status: "stored" | "lost" | "damaged"
}

interface StorageCell {
  id: string
  name: string
  purpose: CellPurpose
  orders: OrderInCell[]
}

const initialCells: StorageCell[] = [
  {
    id: "cell-1",
    name: "DROPOFF",
    purpose: "dropoff",
    orders: [],
  },
  {
    id: "cell-2",
    name: "1",
    purpose: "storage",
    orders: [],
  },
  {
    id: "cell-3",
    name: "2",
    purpose: "storage",
    orders: [
      { id: "ORDER-111", expiryDate: "2025-06-15", status: "stored" },
    ],
  },
  {
    id: "cell-4",
    name: "3",
    purpose: "storage",
    orders: [],
  },
  {
    id: "cell-5",
    name: "4",
    purpose: "storage",
    orders: [],
  },
  {
    id: "cell-6",
    name: "5",
    purpose: "storage",
    orders: [],
  },
  {
    id: "cell-7",
    name: "6",
    purpose: "storage",
    orders: [],
  },
  {
    id: "cell-8",
    name: "7",
    purpose: "storage",
    orders: [],
  },
  {
    id: "cell-9",
    name: "8",
    purpose: "storage",
    orders: [],
  },
  {
    id: "cell-10",
    name: "9",
    purpose: "storage",
    orders: [],
  },
]

const PvzWarehouseManagement = () => {
  const [cells, setCells] = useState<StorageCell[]>(initialCells)
  const [newCellName, setNewCellName] = useState("")
  const [newCellPurpose, setNewCellPurpose] = useState<CellPurpose>("storage")
  const [editingCell, setEditingCell] = useState<StorageCell | null>(null)
  const [editCellName, setEditCellName] = useState("")
  const [editCellPurpose, setEditCellPurpose] = useState<CellPurpose>("storage")

  const addCell = () => {
    if (!newCellName.trim()) return alert("Введите название ячейки")
    if (cells.find((c) => c.name.toLowerCase() === newCellName.toLowerCase())) {
      return alert("Ячейка с таким именем уже существует")
    }
    const newCell: StorageCell = {
      id: `cell-${Date.now()}`,
      name: newCellName.trim(),
      purpose: newCellPurpose,
      orders: [],
    }
    setCells((prev) => [...prev, newCell])
    setNewCellName("")
    setNewCellPurpose("storage")
  }

  const startEditing = (cell: StorageCell) => {
    setEditingCell(cell)
    setEditCellName(cell.name)
    setEditCellPurpose(cell.purpose)
  }

  const saveEdit = () => {
    if (!editingCell) return
    if (!editCellName.trim()) return alert("Введите название ячейки")
    if (
      cells.some(
        (c) =>
          c.id !== editingCell.id &&
          c.name.toLowerCase() === editCellName.toLowerCase()
      )
    ) {
      return alert("Ячейка с таким именем уже существует")
    }
    setCells((prev) =>
      prev.map((c) =>
        c.id === editingCell.id
          ? { ...c, name: editCellName.trim(), purpose: editCellPurpose }
          : c
      )
    )
    setEditingCell(null)
  }

  const deleteCell = (cellId: string) => {
    const cell = cells.find((c) => c.id === cellId)
    if (!cell) return
    if (cell.orders.length > 0) {
      return alert("Нельзя удалить ячейку с заказами")
    }
    if (
      window.confirm(`Удалить ячейку "${cell.name}"? Это действие нельзя отменить.`)
    ) {
      setCells((prev) => prev.filter((c) => c.id !== cellId))
    }
  }

  return (
    <div className="flex flex-col h-full p-4 gap-6">
      <h1 className="text-2xl font-bold mb-4">Управление ячейками склада ПВЗ</h1>

      {/* Добавление новой ячейки */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block font-medium mb-1">Название ячейки</label>
          <input
            type="text"
            value={newCellName}
            onChange={(e) => setNewCellName(e.target.value)}
            className="border rounded p-2 w-48"
            placeholder="например DROPOFF, 1, 2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Назначение</label>
          <select
            value={newCellPurpose}
            onChange={(e) => setNewCellPurpose(e.target.value as CellPurpose)}
            className="border rounded p-2"
          >
            <option value="storage">Для размещения заказов</option>
            <option value="dropoff">DROPOFF (для селлеров)</option>
          </select>
        </div>
        <button
          onClick={addCell}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Добавить ячейку
        </button>
      </div>

      {/* Список ячеек */}
      <div className="flex flex-wrap gap-6 overflow-auto" style={{ maxHeight: "60vh" }}>
        {cells.map((cell) => (
          <div
            key={cell.id}
            className="border rounded p-4 shadow bg-white flex flex-col w-60"
          >
            {editingCell?.id === cell.id ? (
              <>
                <input
                  type="text"
                  value={editCellName}
                  onChange={(e) => setEditCellName(e.target.value)}
                  className="border rounded p-1 mb-2"
                />
                <select
                  value={editCellPurpose}
                  onChange={(e) => setEditCellPurpose(e.target.value as CellPurpose)}
                  className="border rounded p-1 mb-4"
                >
                  <option value="storage">Для размещения заказов</option>
                  <option value="dropoff">DROPOFF (для селлеров)</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setEditingCell(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Отмена
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-lg mb-2">{cell.name}</h3>
                <p className="mb-2 text-sm text-gray-600">
                  Назначение:{" "}
                  {cell.purpose === "dropoff"
                    ? "DROPOFF (для селлеров)"
                    : "Для размещения заказов"}
                </p>
                <p className="mb-4 text-sm">
                  Заказов в ячейке:{" "}
                  <span className="font-medium">{cell.orders.length}</span>
                </p>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => startEditing(cell)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => deleteCell(cell.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                    disabled={cell.orders.length > 0}
                    title={
                      cell.orders.length > 0
                        ? "Нельзя удалить ячейку с заказами"
                        : undefined
                    }
                  >
                    Удалить
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PvzWarehouseManagement