import React, { useState } from "react"

interface Parcel {
  id: string
  orderNumber: string
}

interface PlacedParcel extends Parcel {
  cellName: string
}

const initialParcels: Parcel[] = [
  { id: "1", orderNumber: "ORDER-101" },
  { id: "2", orderNumber: "ORDER-102" },
  { id: "3", orderNumber: "ORDER-103" },
]

const storageCells = ["1", "2", "3", "DROPOFF"]

const PvzPlaceOrders = () => {
  const [unplacedParcels, setUnplacedParcels] = useState<Parcel[]>(initialParcels)
  const [placedParcel, setPlacedParcel] = useState<PlacedParcel | null>(null)
  const [scanInput, setScanInput] = useState("")
  const [modalParcel, setModalParcel] = useState<PlacedParcel | null>(null)

  const findFreeCell = (): string | null => {
    // Ищем ячейку не занятую размещённой посылкой (т.к. только одна размещена)
    for (const cell of storageCells) {
      if (!placedParcel || placedParcel.cellName !== cell) {
        return cell
      }
    }
    return null
  }

  const handleScan = () => {
    const orderNumber = scanInput.trim().toUpperCase()
    if (!orderNumber) {
      alert("Введите номер посылки")
      return
    }
    const parcel = unplacedParcels.find((p) => p.orderNumber === orderNumber)
    if (!parcel) {
      alert("Посылка не найдена или уже размещена")
      return
    }
    const freeCell = findFreeCell()
    if (!freeCell) {
      alert("Нет свободных ячеек")
      return
    }

    setPlacedParcel({ ...parcel, cellName: freeCell })
    setUnplacedParcels((prev) => prev.filter((p) => p.id !== parcel.id))
    setScanInput("")
  }

  const openModal = (parcel: PlacedParcel) => setModalParcel(parcel)
  const closeModal = () => setModalParcel(null)

  const changeCell = (newCell: string) => {
    if (!modalParcel) return
    // Проверяем, что новая ячейка не совпадает с текущей, т.к. других размещенных посылок нет
    setPlacedParcel((prev) => (prev ? { ...prev, cellName: newCell } : null))
    closeModal()
  }

  // Если нет ожидаемых посылок и нет размещенной — показываем центральное сообщение
  if (unplacedParcels.length === 0 && !placedParcel) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-3xl font-semibold mb-4">Нет заказов для размещения</h2>
        <p className="text-gray-600">Вы молодец!</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Панель сканирования сверху */}
      <div className="p-4 border-b flex gap-2">
        <input
          type="text"
          placeholder="Сканируйте ШК или введите номер"
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          className="flex-1 border rounded p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleScan()
          }}
          autoFocus
        />
        <button
          onClick={handleScan}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сканировать
        </button>
      </div>

      {/* Основной контейнер с двумя колонками (поменяли местами) */}
      <div className="flex flex-1 gap-6 p-4 overflow-y-auto">
        {/* Левая колонка - ожидаемые (не размещённые) посылки */}
        <div className="flex-1 border rounded-lg p-4 bg-gray-50 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Ожидаемые заказы</h2>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-full">
            {unplacedParcels.length === 0 ? (
              <p className="text-gray-500 italic">Заказов для размещения нет</p>
            ) : (
              unplacedParcels.map((parcel) => (
                <div
                  key={parcel.id}
                  className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 text-center font-semibold text-yellow-900 shadow-sm"
                >
                  {parcel.orderNumber}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Правая колонка - размещённая посылка (одна) */}
        <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Размещённая посылка</h2>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-full">
            {!placedParcel ? (
              <p className="text-gray-500 italic">Пока нет размещённой посылки</p>
            ) : (
              <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded-lg p-3 shadow-sm">
                <span className="font-medium text-green-900">{placedParcel.orderNumber}</span>
                <button
                  onClick={() => openModal(placedParcel)}
                  className="bg-green-600 text-white rounded-full px-6 py-2 text-lg font-semibold hover:bg-green-700 transition"
                  title="Изменить ячейку"
                >
                  {placedParcel.cellName}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно для смены ячейки */}
      {modalParcel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-lg p-6 w-80 max-w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Выберите ячейку для <span className="font-mono">{modalParcel.orderNumber}</span>
            </h3>
            <div className="flex flex-col gap-3 max-h-64 overflow-auto">
              {storageCells.map((cell) => {
                const isOccupied = placedParcel?.cellName === cell && placedParcel.id !== modalParcel.id
                // При одном размещении ячейки не заняты кроме самой текущей
                return (
                  <button
                    key={cell}
                    onClick={() => changeCell(cell)}
                    className={`rounded-md p-2 border text-center transition ${
                      cell === modalParcel.cellName
                        ? "bg-green-100 border-green-400 font-semibold"
                        : "hover:bg-green-50 border-gray-300"
                    }`}
                  >
                    {cell}
                  </button>
                )
              })}
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 text-white rounded-md py-2 w-full hover:bg-red-600 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PvzPlaceOrders
