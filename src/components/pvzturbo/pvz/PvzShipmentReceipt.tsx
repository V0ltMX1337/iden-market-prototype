import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const courierIcons: Record<string, JSX.Element> = {
  Trivo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  Boxberry: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-purple-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
    </svg>
  ),
}

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
  const [isScanning, setIsScanning] = useState(false)

  const scanOrder = (orderId: string) => {
    const foundOrder = expectedOrders.find((o) => o.id === orderId)
    if (!foundOrder) {
      alert("Заказ не найден")
      return
    }

    if (currentCarrier && foundOrder.carrier !== currentCarrier) {
      alert(`Нельзя сканировать заказы курьера ${foundOrder.carrier}, пока не завершена приемка для ${currentCarrier}`)
      return
    }

    if (!currentCarrier) setCurrentCarrier(foundOrder.carrier)

    setExpectedOrders((prev) => prev.filter((o) => o.id !== orderId))
    setScannedOrders((prev) => [...prev, { ...foundOrder, scanned: true }])
  }

  const handleScan = () => {
    const trimmed = scanInput.trim()
    if (!trimmed) return

    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 600)

    scanOrder(trimmed)
    setScanInput("")
  }

  const undoScan = (orderId: string) => {
    const orderToUndo = scannedOrders.find((o) => o.id === orderId)
    if (!orderToUndo) return

    setScannedOrders((prev) => prev.filter((o) => o.id !== orderId))
    setExpectedOrders((prev) => [...prev, { ...orderToUndo, scanned: false }])

    if (scannedOrders.length === 1) {
      setCurrentCarrier(null)
    }
  }

  const finishAcceptance = () => {
    if (!currentCarrier) {
      alert("Нет активной приемки")
      return
    }

    const missing = expectedOrders.filter((o) => o.carrier === currentCarrier)
    if (missing.length) {
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

  const groupedExpectedOrders = expectedOrders.reduce<Record<string, Order[]>>((acc, order) => {
    if (!acc[order.carrier]) acc[order.carrier] = []
    acc[order.carrier].push(order)
    return acc
  }, {})

  const handleDownloadAct = (shipmentId: string) => {
    alert(`Скачивание акта сверки для поставки ${shipmentId}...`)
  }

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Сканирование */}
        <div className="p-4 border-b border-gray-300 flex gap-3 bg-white shadow-md">
          <Input
            placeholder="Сканируйте ШК или введите номер"
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            className={`flex-1 transition rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${isScanning ? "animate-scan" : ""}`}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            autoFocus
          />
          <Button
            onClick={handleScan}
            className={`px-6 ${isScanning ? "animate-pulse bg-green-500 hover:bg-green-600" : "bg-green-600 hover:bg-green-700"}`}
          >
            Сканировать
          </Button>
        </div>

        {/* Контейнер с двумя колонками */}
        <div className="flex flex-1 gap-6 p-5 overflow-y-auto">
          {/* Ожидаемые заказы */}
          <section className="flex-1 border rounded-lg p-5 bg-white shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-300 pb-2">Ожидаемые заказы</h2>
            <div className="flex flex-col flex-1 overflow-y-auto space-y-3">
              {Object.entries(groupedExpectedOrders).map(([carrier, orders]) => (
                <div key={carrier}>
                  <h3 className="flex items-center text-xl font-semibold mb-3 space-x-3 text-gray-700">
                    <span>{courierIcons[carrier]}</span>
                    <span>{carrier} Курьер:</span>
                  </h3>
                  <div className="flex flex-col space-y-2 max-h-64 overflow-y-auto">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="w-full flex items-center justify-between bg-green-50 border border-green-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-green-100"
                        onClick={() => scanOrder(order.id)}
                        title={`Отметить заказ ${order.id} как отсканированный`}
                      >
                        <div className="flex items-center gap-3 text-green-700 font-medium">
                          <div className="w-10 h-10 bg-green-200 rounded-md flex items-center justify-center text-green-600 text-lg animate-fade-in">
                            📦
                          </div>
                          <span className="select-none">{order.id}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            scanOrder(order.id)
                          }}
                          aria-label={`Отметить заказ ${order.id} как отсканированный`}
                          className="p-1 hover:bg-green-200 rounded transition"
                        >
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
                <p className="text-gray-500 text-center mt-10 italic">Ожидаемых заказов нет</p>
              )}
            </div>
          </section>

          {/* Принятые поставки */}
          <section className="flex-1 border rounded-lg p-5 bg-white shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-300 pb-2">Принятые поставки</h2>

            {/* Отсканированные текущей сессии */}
            {scannedOrders.length > 0 && (
              <div className="mb-6 flex flex-col gap-4 max-h-64 overflow-y-auto">
                <h3 className="font-semibold mb-3 text-gray-800">Отсканировано (не подтверждено):</h3>
                {scannedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between bg-green-50 border border-green-300 rounded-lg px-5 py-2 shadow-sm hover:shadow-md transition cursor-pointer hover:bg-green-100"
                  >
                    <div className="flex items-center gap-3 text-green-700 font-medium">
                      <div className="w-10 h-10 bg-green-200 rounded-md flex items-center justify-center text-green-600 text-lg animate-fade-in">
                        📦
                      </div>
                      <span className="select-none">
                        {order.id} ({order.carrier})
                      </span>
                    </div>
                    <button
                      onClick={() => undoScan(order.id)}
                      title="Вернуть в ожидаемые"
                      className="ml-2 p-1 hover:bg-red-300 rounded transition"
                      aria-label={`Вернуть заказ ${order.id} в ожидаемые`}
                    >
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
                <Button variant="primary" onClick={finishAcceptance}>
                  Завершить приемку
                </Button>
              </div>
            )}

            {/* История подтвержденных поставок */}
            <div className="flex-1 overflow-y-auto">
              {completedShipments.length === 0 ? (
                <p className="text-gray-500 italic text-center mt-10">Нет подтвержденных поставок</p>
              ) : (
                completedShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="bg-white border border-green-300 rounded-lg p-4 shadow-md mb-4 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 font-semibold text-green-700">
                        <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center text-green-600 text-xl">
                          📦
                        </div>
                        <span>Поставка: {format(new Date(shipment.date), "dd.MM.yyyy HH:mm")}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadAct(shipment.id)}>
                        Скачать акт сверки
                      </Button>
                    </div>
                    <ul className="max-h-48 overflow-y-auto text-gray-700 space-y-2">
                      {shipment.orders.map((order) => (
                        <li
                          key={order.id}
                          className="flex items-center gap-2 border border-green-300 rounded-lg px-4 py-2 shadow-sm"
                        >
                          <span className="w-6 h-6 flex items-center justify-center">
                            {courierIcons[order.carrier] ?? <span>🚚</span>}
                          </span>
                          <span>{order.id}</span>
                          <Badge variant="outline" className="ml-auto">
                            {order.carrier}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Диалог пропущенных заказов */}
        <Dialog open={showMismatchDialog} onOpenChange={setShowMismatchDialog}>
          <DialogContent>
            <h3 className="text-lg font-semibold mb-4">Не все заказы отсканированы</h3>
            <p>Отсутствуют следующие заказы для курьера <b>{currentCarrier}</b>:</p>
            <ul className="list-disc pl-6 mt-2 mb-4 text-red-600">
              {missingOrders.map((order) => (
                <li key={order.id}>{order.id}</li>
              ))}
            </ul>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowMismatchDialog(false)}>
                Отмена
              </Button>
              <Button variant="destructive" onClick={confirmAcceptance}>
                Подтвердить приемку без пропущенных заказов
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <style>{`
        @keyframes scan {
          0% { box-shadow: 0 0 8px 2px #22c55e; }
          50% { box-shadow: 0 0 14px 4px #22c55e; }
          100% { box-shadow: 0 0 8px 2px #22c55e; }
        }
        .animate-scan {
          animation: scan 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </>
  )
}

export default PvzShipmentReceipt
