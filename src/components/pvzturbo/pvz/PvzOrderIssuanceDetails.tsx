
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

type ParcelStatus = "pending" | "scanned" | "refused"

interface Parcel {
  id: string
  image: string
  title: string
  cell: string
  status: ParcelStatus
  codAmount?: number
  refusalReason?: string
  justChanged?: boolean
}

const PvzOrderIssuanceDetails = () => {
  const [scanValue, setScanValue] = useState("")
  const [selectedForRefusal, setSelectedForRefusal] = useState<string | null>(null)
  const [refusalReason, setRefusalReason] = useState("")
  const [issued, setIssued] = useState(false)
  const [paid, setPaid] = useState(false)
  const [modalParcel, setModalParcel] = useState<Parcel | null>(null)
  const navigate = useNavigate()

  const [parcels, setParcels] = useState<Parcel[]>([
    {
      id: "ORDER-1-234231818234",
      image: "https://via.placeholder.com/60",
      title: "Смарт-часы Xiaomi",
      cell: "17-1",
      status: "pending",
      codAmount: 0,
    },
    {
      id: "ORDER-1-234231818235",
      image: "https://via.placeholder.com/60",
      title: "Наушники JBL",
      cell: "17-2",
      status: "pending",
      codAmount: 3200,
    },
  ])

  const speak = async (text: string) => {
    if (!text) return
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ru&client=tw-ob`
      const response = await fetch(url, {
        headers: {
          Referer: "https://translate.google.com/",
          "User-Agent": "Mozilla/5.0",
        },
      })
      if (!response.ok) throw new Error("Failed to fetch TTS audio")
      const blob = await response.blob()
      const audioUrl = URL.createObjectURL(blob)
      const audio = new Audio(audioUrl)
      audio.play()
    } catch (e) {
      console.warn("TTS error:", e)
    }
  }

  const playSound = (file: string) => {
    const audio = new Audio(`/sounds/${file}`)
    audio.play().catch(() => {})
  }

  const handleScan = (id?: string) => {
    const trimmed = id || scanValue.trim()
    if (!trimmed) return

    const found = parcels.find((p) => p.id === trimmed)
    if (!found) {
      playSound("error.mp3")
      speak("Посылка не найдена")
    } else {
      setParcels((prev) =>
        prev.map((p) =>
          p.id === trimmed ? { ...p, status: "scanned", justChanged: true } : p
        )
      )
      playSound("success.mp3")
      if (found.codAmount && found.codAmount > 0) {
        speak("Оплата по терминалу")
      } else {
        speak("Посылка принята")
      }
    }
    setScanValue("")
  }

  useEffect(() => {
    if (parcels.some((p) => p.justChanged)) {
      const t = setTimeout(() => {
        setParcels((prev) => prev.map((p) => ({ ...p, justChanged: false })))
      }, 600)
      return () => clearTimeout(t)
    }
  }, [parcels])

  const handleRefusal = () => {
    if (!selectedForRefusal || !refusalReason) return
    setParcels((prev) =>
      prev.map((p) =>
        p.id === selectedForRefusal ? { ...p, status: "refused", refusalReason } : p
      )
    )
    playSound("error.mp3")
    speak("Посылка отклонена")
    setSelectedForRefusal(null)
    setRefusalReason("")
  }

  const scanned = parcels.filter((p) => p.status === "scanned")
  const refused = parcels.filter((p) => p.status === "refused")
  const scannedCOD = scanned.filter((p) => p.codAmount && p.codAmount > 0)

  const handleIssue = () => {
    setIssued(true)
    playSound("complete.mp3")
    speak("Все посылки выданы")
    navigate("/pvzturbo")
  }

  const handleToReturns = () => {
    navigate("/pvzturbo/order-issuance/returns-packaging")
  }

  const handleToPayment = () => {
    setPaid(true)
  }

  return (
    <>
      <style>{`
        @keyframes highlightGlow {
          0% { box-shadow: 0 0 0px 0px rgba(34,197,94, 0.7); background-color: #d1fae5; }
          50% { box-shadow: 0 0 10px 6px rgba(34,197,94, 0.5); background-color: #bbf7d0; }
          100% { box-shadow: 0 0 0px 0px rgba(34,197,94, 0); background-color: transparent; }
        }
      `}</style>

      <div className="space-y-6 relative min-h-[400px] pb-20">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Сканируйте посылку</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Введите ID посылки"
              value={scanValue}
              onChange={(e) => setScanValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleScan()
                }
              }}
              disabled={issued}
              autoFocus
            />
            <Button onClick={() => handleScan()} disabled={!scanValue || issued}>
              Сканировать
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Информация о клиенте</h3>
          <p className="text-lg font-semibold text-gray-700 mb-2">Иванов Иван Иванович</p>
          <p className="text-lg text-gray-600">Телефон: <a href="tel:+79001234567" className="text-blue-600 hover:underline">+7 (900) 123-45-67</a></p>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {parcels.map((p) => (
            <div
              key={p.id}
              className={cn(
                "p-4 rounded-lg border bg-white shadow-sm flex flex-col justify-between min-h-[130px] hover:shadow-md transition-shadow relative",
                {
                  "opacity-60 cursor-default": p.status === "refused",
                  "border-green-500": p.status === "scanned",
                  "border-gray-300": p.status === "pending",
                  "animate-highlightGlow": p.justChanged,
                }
              )}
              onClick={() => p.status !== "refused" && handleScan(p.id)}
              style={p.justChanged ? { animation: "highlightGlow 1s ease forwards" } : undefined}
            >
              <div className="flex gap-3 mb-4 items-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setModalParcel(p)
                  }}
                />
                <div>
                  <span className="block font-semibold text-lg">{p.title}</span>
                  <span className="block font-mono text-gray-700 mt-1">Заказ: {p.id}</span>
                </div>
              </div>

              <span className="absolute top-4 right-4 bg-yellow-400 text-black font-bold text-lg px-3 py-1 rounded-full shadow-md select-none pointer-events-none">
                {p.cell}
              </span>

              <div className="flex justify-between items-center">
                {p.status !== "refused" && !issued && (
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation()
                    setSelectedForRefusal(p.id)
                  }}>
                    Отказаться
                  </Button>
                )}
              </div>

              {p.status === "refused" && p.refusalReason && (
                <p className="text-red-600 mt-2 text-sm select-none">Отказ: {p.refusalReason}</p>
              )}
              {p.codAmount && p.codAmount > 0 && (
                <p className="mt-2 text-orange-600 font-semibold select-none">
                  Наложенный платёж: {p.codAmount} ₽
                </p>
              )}
            </div>
          ))}
        </div>

        <Dialog open={!!modalParcel} onOpenChange={() => setModalParcel(null)}>
          <DialogContent className="max-w-2xl">
            {modalParcel && (
              <div className="space-y-4">
                <img src={modalParcel.image} alt={modalParcel.title} className="w-full max-h-64 object-contain rounded-lg" />
                <h2 className="text-xl font-bold">{modalParcel.title}</h2>
                <p>Описание: Тестовое описание товара</p>
                <p>Стоимость: {modalParcel.codAmount ?? "—"} ₽</p>
                <p>Оценочная стоимость: {modalParcel.codAmount ? modalParcel.codAmount + 500 : "—"} ₽</p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedForRefusal} onOpenChange={(open) => !open && setSelectedForRefusal(null)}>
          <DialogContent>
            <h3 className="font-semibold mb-4">Причина отказа</h3>
            <RadioGroup onValueChange={setRefusalReason} value={refusalReason}>
              {["Не подошло", "Брак", "Привезли не то"].map((r, idx) => (
                <div className="flex items-center gap-2" key={idx}>
                  <RadioGroupItem value={r} id={`reason-${idx}`} />
                  <Label htmlFor={`reason-${idx}`}>{r}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button onClick={handleRefusal} disabled={!refusalReason} className="mt-4">
              Подтвердить отказ
            </Button>
          </DialogContent>
        </Dialog>

        {!issued && (
          <div className="absolute bottom-10 left-10">
            {scannedCOD.length > 0 && !paid ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 text-sm rounded">
                    Перейти к оплате
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <h3 className="font-semibold text-lg">Оплата заказа</h3>
                  <ul className="text-sm space-y-1">
                    {scannedCOD.map((p) => (
                      <li key={p.id}>{p.title}: {p.codAmount} ₽</li>
                    ))}
                  </ul>
                  <p className="mt-2 font-medium">
                    Итого: {scannedCOD.reduce((sum, p) => sum + (p.codAmount || 0), 0)} ₽
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Button onClick={handleToPayment}>Оплата наличными</Button>
                    <Button onClick={handleToPayment} variant="outline">Оплата картой</Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                className="bg-green-600 hover:bg-green-500 px-4 py-2 text-sm rounded"
                onClick={handleIssue}
                disabled={scanned.length === 0}
              >
                Выдать заказ
              </Button>
            )}
          </div>
        )}

        {issued && refused.length > 0 && (
          <div className="border-t pt-6">
            <Button className="w-full" onClick={handleToReturns}>
              Перейти к упаковке возвратов
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default PvzOrderIssuanceDetails
