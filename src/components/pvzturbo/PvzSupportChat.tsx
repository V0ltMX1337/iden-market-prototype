import React, { useState, ChangeEvent, FormEvent } from "react";

type TicketType = "Потеря" | "Спор" | "Брак" | "Жалоба" | "Выходной день";
type TicketStatus = "Новый" | "В работе" | "Завершён";

interface Message {
  id: string;
  author: string;
  text: string;
  photos?: string[];
  createdAt: Date;
}

interface Ticket {
  id: string;
  type: TicketType;
  orderNumber: string;
  responsible: string;
  status: TicketStatus;
  messages: Message[];
}

const employees = ["Иванов И.", "Петров П.", "Сидоров С."];

const PvzSupportChat = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);

  // Новый тикет
  const [newType, setNewType] = useState<TicketType>("Потеря");
  const [newOrderNumber, setNewOrderNumber] = useState("");
  const [newResponsible, setNewResponsible] = useState(employees[0]);
  const [newStatus, setNewStatus] = useState<TicketStatus>("Новый");
  const [newInitialMessage, setNewInitialMessage] = useState("");

  // Новое сообщение в чате
  const [newMessageText, setNewMessageText] = useState("");

  // Создать новый тикет
  const handleCreateTicket = (e: FormEvent) => {
    e.preventDefault();
    if (!newOrderNumber.trim() || !newInitialMessage.trim()) {
      alert("Введите номер заказа и сообщение");
      return;
    }
    const newTicket: Ticket = {
      id: (Date.now() + Math.random()).toString(),
      type: newType,
      orderNumber: newOrderNumber,
      responsible: newResponsible,
      status: newStatus,
      messages: [
        {
          id: (Date.now() + Math.random()).toString(),
          author: "Пользователь",
          text: newInitialMessage,
          createdAt: new Date(),
        },
      ],
    };
    setTickets([newTicket, ...tickets]);
    setSelectedTicketId(newTicket.id);
    setNewTicketModalOpen(false);
    // Сброс формы
    setNewType("Потеря");
    setNewOrderNumber("");
    setNewResponsible(employees[0]);
    setNewStatus("Новый");
    setNewInitialMessage("");
  };

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  // Добавить сообщение в тикет
  const handleSendMessage = () => {
    if (!newMessageText.trim() || !selectedTicket) return;
    const newMsg: Message = {
      id: (Date.now() + Math.random()).toString(),
      author: "Пользователь",
      text: newMessageText.trim(),
      createdAt: new Date(),
    };
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, messages: [...t.messages, newMsg] }
          : t
      )
    );
    setNewMessageText("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-6">
      {/* Заголовок и кнопка создания */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Чат с поддержкой</h1>
        <button
          onClick={() => setNewTicketModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Создать тикет
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden rounded shadow bg-white">
        {/* Список тикетов слева */}
        <div className="w-96 border-r overflow-y-auto">
          {tickets.length === 0 && (
            <p className="p-4 text-gray-500">Тикеты отсутствуют</p>
          )}
          {tickets.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTicketId(t.id)}
              className={`cursor-pointer p-4 border-b hover:bg-gray-100 ${
                t.id === selectedTicketId ? "bg-blue-100" : ""
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{t.type}</span>
                <span className="text-sm text-gray-600">{t.status}</span>
              </div>
              <div className="text-sm">{t.orderNumber}</div>
              <div className="text-xs text-gray-500">Ответственный: {t.responsible}</div>
              <div className="mt-1 text-xs text-gray-700 truncate">
                {t.messages[t.messages.length - 1]?.text || ""}
              </div>
            </div>
          ))}
        </div>

        {/* Окно переписки справа */}
        <div className="flex flex-col flex-1">
          {!selectedTicket && (
            <div className="flex flex-col items-center justify-center flex-1 text-gray-500">
              Выберите тикет для просмотра переписки
            </div>
          )}

          {selectedTicket && (
            <>
              <div className="flex flex-col flex-1 p-4 overflow-y-auto space-y-4">
                {selectedTicket.messages.map((msg) => (
                  <div key={msg.id} className="max-w-md">
                    <div className="text-sm font-semibold">{msg.author}</div>
                    <div className="bg-gray-100 rounded p-2 mt-1 whitespace-pre-wrap">
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {msg.createdAt.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Поле ввода нового сообщения */}
              <div className="border-t p-4 flex gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Введите сообщение..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
                >
                  Отправить
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Модальное окно создания тикета */}
      {newTicketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-lg overflow-auto max-h-full">
            <button
              onClick={() => setNewTicketModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Создать тикет</h3>
            <form onSubmit={handleCreateTicket} className="flex flex-col gap-4">
              <label>
                Тип инцидента:
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as TicketType)}
                  className="w-full border rounded p-2 mt-1"
                >
                  <option>Потеря</option>
                  <option>Спор</option>
                  <option>Брак</option>
                  <option>Жалоба</option>
                  <option>Выходной день</option>
                </select>
              </label>

              <label>
                Номер заказа:
                <input
                  type="text"
                  value={newOrderNumber}
                  onChange={(e) => setNewOrderNumber(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Введите номер заказа"
                />
              </label>

              <label>
                Ответственный:
                <select
                  value={newResponsible}
                  onChange={(e) => setNewResponsible(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                >
                  {employees.map((emp) => (
                    <option key={emp} value={emp}>
                      {emp}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Статус:
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as TicketStatus)}
                  className="w-full border rounded p-2 mt-1"
                >
                  <option>Новый</option>
                  <option>В работе</option>
                  <option>Завершён</option>
                </select>
              </label>

              <label>
                Первое сообщение:
                <textarea
                  value={newInitialMessage}
                  onChange={(e) => setNewInitialMessage(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                  rows={3}
                  placeholder="Опишите проблему"
                />
              </label>

              <button
                type="submit"
                className="bg-blue-600 text-white rounded py-2 mt-4 hover:bg-blue-700 transition"
              >
                Создать тикет
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PvzSupportChat;
