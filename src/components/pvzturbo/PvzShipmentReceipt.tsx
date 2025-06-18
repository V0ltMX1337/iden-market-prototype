import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Order {
  id: string
  carrier: string
  scanned: boolean
}

interface Shipment {
  id: string
  date: string
  orders: Order[]
}

const mockExpectedOrders: Order[] = [
  { id: "ORDER-111", carrier: "Trivo", scanned: false },
  { id: "ORDER-112", carrier: "Trivo", scanned: false },
  { id: "ORDER-113", carrier: "Boxberry", scanned: false },
]

const PvzShipmentReceipt = () => {
  const [scanInput, setScanInput] = useState("")
  const [expectedOrders, setExpectedOrders] = useState<Order[]>(mockExpectedOrders)
  const [scannedOrders, setScannedOrders] = useState<Order[]>([])
  const [completedShipments, setCompletedShipments] = useState<Shipment[]>([])
  const [showMismatchDialog, setShowMismatchDialog] = useState(false)
  const [missingOrders, setMissingOrders] = useState<Order[]>([])
  const [currentCarrier, setCurrentCarrier] = useState<string | null>(null)

  // Функция сканирования — общая для кнопки и инпута
  const scanOrder = (orderId: string) => {
    const match = expectedOrders.find((o) => o.id === orderId)
    if (!match) {
      alert("Заказ не найден")
      return
    }

    if (currentCarrier && match.carrier !== currentCarrier) {
      alert(`Вы не можете сканировать заказы курьера ${match.carrier}, пока не завершите приемку для ${currentCarrier}`)
      return
    }

    if (!currentCarrier) {
      setCurrentCarrier(match.carrier)
    }

    setExpectedOrders((prev) => prev.filter((o) => o.id !== orderId))
    setScannedOrders((prev) => [...prev, { ...match, scanned: true }])
  }

  const handleScan = () => {
    const trimmedInput = scanInput.trim()
    if (!trimmedInput) return
    scanOrder(trimmedInput)
    setScanInput("")
  }

  // Вернуть заказ из отсканированных обратно в ожидаемые
  const undoScan = (orderId: string) => {
    const match = scannedOrders.find((o) => o.id === orderId)
    if (!match) return
    setScannedOrders((prev) => prev.filter((o) => o.id !== orderId))
    setExpectedOrders((prev) => [...prev, { ...match, scanned: false }])

    // Если больше нет отсканированных заказов, сбросим currentCarrier
    if (scannedOrders.length === 1) {
      setCurrentCarrier(null)
    }
  }

  // Завершить приемку
  const handleFinishAcceptance = () => {
    const missing = expectedOrders.filter((o) => o.carrier === currentCarrier)
    if (missing.length > 0) {
      setMissingOrders(missing)
      setShowMismatchDialog(true)
    } else {
      confirmAcceptance()
    }
  }

  const confirmAcceptance = () => {
    if (scannedOrders.length === 0) {
      alert("Нет отсканированных заказов для подтверждения")
      return
    }
    const newShipment: Shipment = {
      id: `shipment-${Date.now()}`,
      date: new Date().toISOString(),
      orders: scannedOrders,
    }
    setCompletedShipments((prev) => [newShipment, ...prev])
    setExpectedOrders((prev) => prev.filter((o) => o.carrier !== currentCarrier))
    setScannedOrders([])
    setCurrentCarrier(null)
    setShowMismatchDialog(false)
  }

  const groupedExpectedOrders = expectedOrders.reduce((acc, order) => {
    if (!acc[order.carrier]) acc[order.carrier] = []
    acc[order.carrier].push(order)
    return acc
  }, {} as Record<string, Order[]>)

  const handleDownloadAct = (shipmentId: string) => {
    alert(`Скачивание акта сверки для поставки ${shipmentId}...`)
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Сканирование */}
      <div className="p-4 border-b flex gap-2">
        <Input
          placeholder="Сканируйте ШК или введите номер"
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleScan()
          }}
          autoFocus
        />
        <Button onClick={handleScan}>Сканировать</Button>
      </div>

      {/* Основной контейнер с двумя колонками */}
      <div className="flex flex-1 gap-6 p-4 overflow-y-auto">
        {/* Ожидаемые заказы */}
        <div className="flex-1 border rounded-lg p-4 bg-gray-50 shadow-sm">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Ожидаемые заказы</h2>
          {Object.entries(groupedExpectedOrders).map(([carrier, orders]) => (
            <div
              key={carrier}
              className="mb-6 p-4 bg-white rounded-md shadow-inner border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-3">{carrier} Курьер:</h3>
              <div className="flex flex-col gap-2">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-3 py-1 bg-gray-100 rounded"
                  >
                    <Badge variant="default" className="text-sm cursor-default">
                      {order.id}
                    </Badge>
                    <button
                      onClick={() => scanOrder(order.id)}
                      title="Отметить как отсканированный"
                      className="ml-2 p-1 hover:bg-gray-300 rounded"
                      aria-label={`Отметить заказ ${order.id} как отсканированный`}
                    >
                      {/* Иконка "сканировать" (пример) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-green-600"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {expectedOrders.length === 0 && (
            <p className="text-gray-500 text-center mt-10">Ожидаемых заказов нет</p>
          )}
        </div>

        {/* Принятые поставки */}
        <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Принятые поставки</h2>

          {/* Отсканированные в текущей сессии */}
          {scannedOrders.length > 0 && (
            <div className="mb-6 flex flex-col gap-4">
              <div>
                <h3 className="font-semibold mb-3">Отсканировано (не подтверждено):</h3>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border p-3 rounded">
                  {scannedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between bg-green-100 rounded px-3 py-1"
                    >
                      <Badge variant="success" className="text-sm cursor-default">
                        {order.id} ({order.carrier})
                      </Badge>
                      <button
                        onClick={() => undoScan(order.id)}
                        title="Вернуть в ожидаемые"
                        className="ml-2 p-1 hover:bg-red-300 rounded"
                        aria-label={`Вернуть заказ ${order.id} в ожидаемые`}
                      >
                        {/* Иконка "удалить" (пример) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 text-red-600"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-500"
                onClick={handleFinishAcceptance}
              >
                Завершить приёмку
              </Button>
            </div>
          )}

          {/* История завершенных поставок */}
          {completedShipments.length === 0 && (
            <p className="text-gray-600">Нет завершённых поставок</p>
          )}

          <div className="flex-1 overflow-y-auto">
            {completedShipments.map((shipment) => (
              <div
                key={shipment.id}
                className="mb-6 border rounded-md p-4 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium mb-3">
                    Поставка от {format(new Date(shipment.date), "dd.MM.yyyy HH:mm")}
                  </p>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                    {shipment.orders.map((order) => (
                      <Badge
                        key={order.id}
                        variant="default"
                        className="px-3 py-1 text-sm cursor-default"
                      >
                        {order.id} ({order.carrier})
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadAct(shipment.id)}
                  className="ml-4 self-start"
                >
                  Скачать АПП
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модалка расхождений */}
      <Dialog open={showMismatchDialog} onOpenChange={setShowMismatchDialog}>
        <DialogContent>
          <h3 className="text-lg font-semibold">Сверка расхождений</h3>
          <p className="text-sm text-gray-600 mb-2">
            Обнаружены расхождения между курьером и ПВЗ:
          </p>
          <div className="text-sm mb-2">
            <p>
              <strong>Ожидается:</strong> {missingOrders.length} заказов
            </p>
            <p>
              <strong>Отсканировано:</strong> {scannedOrders.length} заказов
            </p>
          </div>
          <ul className="list-disc pl-5 text-sm mt-2">
            {missingOrders.map((o) => (
              <li key={o.id}>
                {o.id} ({o.carrier})
              </li>
            ))}
          </ul>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              confirmAcceptance()
              setShowMismatchDialog(false)
            }}
          >
            Подтвердить приемку с расхождениями
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PvzShipmentReceipt