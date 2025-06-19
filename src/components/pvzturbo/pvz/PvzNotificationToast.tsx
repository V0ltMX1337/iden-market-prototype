import React, { useEffect, useState } from "react";

interface Notification  {
  id: string;
  type: "task" | "system";
  message: string;
  urgent?: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    message: "Скоро просрочка по заказам! Осталось 2 часа для размещения.",
    urgent: true,
  },
  {
    id: "2",
    type: "task",
    message: "У вас 3 задачи на сегодня: размещение, приемка, проверка.",
  },
  {
    id: "3",
    type: "system",
    message: "Обновление системы прошло успешно.",
  },
  {
    id: "4",
    type: "system",
    message: "Обнаружен сбой на складе №3, требуется вмешательство.",
    urgent: true,
  },
];

const PvzNotificationToast = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [visible, setVisible] = useState(true);

  // Авто-скрытие через 10 секунд (например)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 max-w-full space-y-3 z-50">
      {notifications.map(({ id, type, message, urgent }) => (
        <div
          key={id}
          className={`p-4 rounded shadow-md border font-medium text-sm cursor-pointer select-none ${
            urgent
              ? "bg-red-100 border-red-400 text-red-900"
              : type === "task"
              ? "bg-yellow-100 border-yellow-400 text-yellow-900"
              : "bg-blue-100 border-blue-400 text-blue-900"
          }`}
          onClick={() => {
            // По клику можно делать что-то — например, убрать уведомление
            setNotifications((prev) => prev.filter((n) => n.id !== id));
          }}
          title="Кликните, чтобы закрыть"
        >
          <div className="capitalize mb-1">{type === "task" ? "Задача" : "Система"}</div>
          <div>{message}</div>
        </div>
      ))}
    </div>
  );
};

export default PvzNotificationToast;