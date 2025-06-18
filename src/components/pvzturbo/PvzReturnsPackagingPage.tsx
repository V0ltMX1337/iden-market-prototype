import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const PvzReturnsPackagingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Упаковка возвратов</h1>
      <p className="mb-4">
        Здесь вы можете оформить и упаковать возвраты по отказанным посылкам.
      </p>

      {/* Сюда можно добавить список отказанных посылок и действия с ними */}

      <Button onClick={() => navigate(-1)}>Назад</Button>
    </div>
  )
}

export default PvzReturnsPackagingPage