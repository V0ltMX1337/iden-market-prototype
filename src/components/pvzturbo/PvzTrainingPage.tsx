import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlayCircle, CheckCircle2, Clock } from "lucide-react"
import { Link } from "react-router-dom"

const courses = [
  {
    id: 1,
    title: "Прием и размещение заказов",
    description: "Научитесь правильно принимать и размещать отправления в ячейки.",
    progress: 100,
    status: "completed",
  },
  {
    id: 2,
    title: "Выдача заказов клиентам",
    description: "Правила проверки, сканирования и выдачи отправлений.",
    progress: 40,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Работа с возвратами",
    description: "Возвраты от клиентов и возвраты продавцу — что делать и как оформлять.",
    progress: 0,
    status: "not-started",
  },
]

const statusIcon = {
  completed: <CheckCircle2 className="text-green-500" size={20} />,
  "in-progress": <Clock className="text-yellow-500" size={20} />,
  "not-started": <PlayCircle className="text-gray-400" size={20} />,
}

const PvzTrainingPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Обучение сотрудников</h1>
      <p className="text-gray-600 mb-4">
        Повышайте квалификацию сотрудников с помощью встроенных курсов.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl p-6 bg-white shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {statusIcon[course.status]}
                <span>
                  {course.status === "completed"
                    ? "Завершено"
                    : course.status === "in-progress"
                    ? "В процессе"
                    : "Не начато"}
                </span>
              </div>
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>

            <div className="mt-4 space-y-2">
              <Progress value={course.progress} />
              <Link to={`/pvzturbo/training/${course.id}`}>
                <Button variant="outline" className="w-full">
                  {course.status === "not-started"
                    ? "Начать обучение"
                    : course.status === "in-progress"
                    ? "Продолжить"
                    : "Просмотреть"}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PvzTrainingPage;
