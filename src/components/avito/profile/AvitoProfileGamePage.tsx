import React, { useState, useRef } from "react";

const tabs = ["Награды", "Задания", "Рулетка", "Розыгрыши"];

const AvitoProfileGamePage = () => {
  const [activeTab, setActiveTab] = useState("Награды");
  const [collectedDay, setCollectedDay] = useState(1);
  const [loginRewardCollected, setLoginRewardCollected] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, title: "💬 Отправь сообщение", description: "Напиши первому продавцу", reward: "+10 XP", done: true },
    { id: 2, title: "📌 Добавь в избранное", description: "Добавь объявление в избранное", reward: "+8 XP", done: false },
    { id: 3, title: "🛒 Соверши покупку", description: "Закажи товар с доставкой", reward: "+25 XP", done: false },
  ]);

  const loginRewards = Array.from({ length: 7 }).map((_, i) => ({
    day: i + 1,
    reward: `${(i + 1) * 10} поинтов`,
    collected: i + 1 < collectedDay || (i + 1 === collectedDay && loginRewardCollected),
    current: i + 1 === collectedDay && !loginRewardCollected,
  }));

  const prizes = [
    { id: 1, emoji: "🎧", label: "Наушники" },
    { id: 2, emoji: "🖱️", label: "Игровая мышь" },
    { id: 3, emoji: "🎮", label: "Геймпад" },
    { id: 4, emoji: "🧢", label: "Кепка" },
    { id: 5, emoji: "💰", label: "500₽ Промокод" },
    { id: 6, emoji: "📦", label: "Коробка с сюрпризом" },
    { id: 7, emoji: "👕", label: "Футболка" },
  ];
  const [rouletteIndex, setRouletteIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const rouletteRef = useRef<HTMLDivElement>(null);

const spinRoulette = () => {
  if (isSpinning) return;
  setIsSpinning(true);

  const prizeIndex = Math.floor(Math.random() * prizes.length);

  const currentRef = rouletteRef.current;
  if (currentRef) {
    const itemWidth = 80;
    const spins = 3;
    const totalTranslate = -((spins * prizes.length + prizeIndex) * itemWidth);

    currentRef.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
    currentRef.style.transform = `translateX(${totalTranslate}px)`;

    setTimeout(() => {
      if (currentRef) {
        currentRef.style.transition = "none";
        currentRef.style.transform = `translateX(${-prizeIndex * itemWidth}px)`;
      }
      setRouletteIndex(prizeIndex);
      setIsSpinning(false);
    }, 4200);
  }
};

  const raffles = [
    { id: 1, title: "Игровая мышь", emoji: "🖱️", ticketPrice: 10, endsAt: "25 июля 2025" },
    { id: 2, title: "Футболка Trivo", emoji: "👕", ticketPrice: 5, endsAt: "30 июля 2025" },
  ];

  const [points, setPoints] = useState(100);

  const buyTicket = (raffle: typeof raffles[0]) => {
    if (points < raffle.ticketPrice) {
      alert("Недостаточно поинтов для покупки билета!");
      return;
    }
    setPoints(points - raffle.ticketPrice);
    alert(`Вы купили билет на розыгрыш: ${raffle.title}`);
  };

  // Кнопка вкладок
  const tabBtnStyle = (tab: string) =>
    `px-4 py-2 rounded font-semibold cursor-pointer ${
      activeTab === tab ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  // cardStyle теперь объект стилей для inline style
  const cardStyle = {
    backgroundColor: "white",
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: 20,
    border: "1px solid #e5e7eb",
    marginBottom: 30,
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 16,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9fafb",
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: "700", marginBottom: 20, color: "#4f46e5" }}>
        🎮 Игровой Центр Trivo
      </h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 30 }}>
        {tabs.map((tab) => (
          <button key={tab} className={tabBtnStyle(tab)} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Награды" && (
        <div>
          <div
            style={{
              ...cardStyle,
              backgroundColor: loginRewardCollected ? "#d1fae5" : cardStyle.backgroundColor,
              marginBottom: 30,
            }}
          >
            <h2 style={{ fontSize: 24, fontWeight: "700", marginBottom: 10, color: "#065f46" }}>
              🎁 Ежедневная награда
            </h2>
            <p style={{ marginBottom: 20, color: "#065f46" }}>
              Забирайте поинты за вход в приложение каждый день!
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 10,
                marginBottom: 20,
              }}
            >
              {loginRewards.map(({ day, reward, collected, current }) => (
                <div
                  key={day}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 14,
                    border: current ? "2px solid #16a34a" : collected ? "2px solid #6ee7b7" : "2px solid #d1d5db",
                    backgroundColor: current ? "#bbf7d0" : collected ? "#dcfce7" : "#f3f4f6",
                    color: current || collected ? "#166534" : "#6b7280",
                    userSelect: "none",
                  }}
                >
                  День {day}
                  <br />
                  <span style={{ fontWeight: "normal", fontSize: 12 }}>{reward}</span>
                  {collected && <div style={{ color: "#15803d", fontSize: 12, marginTop: 5 }}>Забрано</div>}
                  {current && !loginRewardCollected && (
                    <div style={{ color: "#15803d", fontSize: 12, marginTop: 5 }}>Доступно</div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                if (!loginRewardCollected) {
                  setLoginRewardCollected(true);
                  alert("Награда за день получена!");
                }
              }}
              disabled={loginRewardCollected}
              style={{
                padding: "10px 20px",
                backgroundColor: loginRewardCollected ? "#a7f3d0" : "#16a34a",
                color: "white",
                fontWeight: "700",
                borderRadius: 8,
                cursor: loginRewardCollected ? "not-allowed" : "pointer",
                boxShadow: loginRewardCollected ? "none" : "0 4px 8px rgba(22, 163, 74, 0.4)",
                transition: "background-color 0.3s",
              }}
            >
              {loginRewardCollected ? "Награда получена" : "Забрать награду"}
            </button>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#4338ca" }}>🏆 Призы</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
                gap: 20,
              }}
            >
              {[
                { title: "Промокод 500₽", emoji: "🎟️", desc: "Скидка на маркетплейсе" },
                { title: "Футболка Trivo", emoji: "👕", desc: "Мерч с логотипом" },
                { title: "Стикеры", emoji: "📦", desc: "Яркие и стильные" },
              ].map(({ title, emoji, desc }, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#eef2ff",
                    borderRadius: 12,
                    padding: 20,
                    textAlign: "center",
                    boxShadow: "0 2px 6px rgba(67,56,202,0.15)",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => alert(`Вы выбрали приз: ${title}`)}
                >
                  <div style={{ fontSize: 40, marginBottom: 10 }}>{emoji}</div>
                  <div style={{ fontWeight: "700", fontSize: 16, marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Задания" && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#6b7280" }}>📋 Задания</h2>
          {tasks.map(({ id, title, description, reward, done }) => (
            <div
              key={id}
              style={{
                marginBottom: 14,
                padding: 12,
                borderRadius: 10,
                backgroundColor: done ? "#d1fae5" : "#f9fafb",
                border: done ? "2px solid #10b981" : "2px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              <div>
                <div style={{ fontWeight: "700", fontSize: 16 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{description}</div>
              </div>
              <div
                style={{
                  fontWeight: "700",
                  color: done ? "#10b981" : "#9ca3af",
                  userSelect: "none",
                }}
              >
                {reward}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Рулетка" && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#9333ea" }}>
            🎰 Рулетка
          </h2>
          <div
            style={{
              overflow: "hidden",
              borderRadius: 12,
              border: "2px solid #ddd",
              marginBottom: 20,
            }}
          >
            <div
              ref={rouletteRef}
              style={{
                display: "flex",
                width: prizes.length * 80,
              }}
            >
              {prizes.concat(prizes).map((prize, i) => (
                <div
                  key={i}
                  style={{
                    width: 80,
                    height: 80,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 32,
                    userSelect: "none",
                    borderRight: "1px solid #ccc",
                    backgroundColor: i === rouletteIndex ? "#ddd" : "white",
                  }}
                >
                  {prize.emoji}
                  <div style={{ fontSize: 12, marginTop: 4 }}>{prize.label}</div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={spinRoulette}
            disabled={isSpinning}
            style={{
              padding: "10px 24px",
              backgroundColor: isSpinning ? "#a78bfa" : "#7c3aed",
              color: "white",
              fontWeight: "700",
              borderRadius: 8,
              cursor: isSpinning ? "not-allowed" : "pointer",
              boxShadow: "0 4px 8px rgba(124,58,237,0.6)",
              transition: "background-color 0.3s",
            }}
          >
            {isSpinning ? "Вращение..." : "Крутить"}
          </button>
        </div>
      )}

      {activeTab === "Розыгрыши" && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#2563eb" }}>
            🎟️ Розыгрыши
          </h2>
          <p style={{ marginBottom: 20 }}>
            Участвуйте в розыгрышах призов, покупая билеты за поинты!
          </p>
          <div>
            {raffles.map(({ id, title, emoji, ticketPrice, endsAt }) => (
              <div
                key={id}
                style={{
                  marginBottom: 14,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 36 }}>{emoji}</div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: 16 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#2563eb" }}>Окончание: {endsAt}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div style={{ fontWeight: "700", marginBottom: 6 }}>
                    Цена билета: {ticketPrice} поинтов
                  </div>
                  <button
                    onClick={() => buyTicket({ id, title, emoji, ticketPrice, endsAt })}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      borderRadius: 8,
                      cursor: points >= ticketPrice ? "pointer" : "not-allowed",
                      opacity: points >= ticketPrice ? 1 : 0.6,
                    }}
                    disabled={points < ticketPrice}
                  >
                    Купить билет
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, fontWeight: "700", fontSize: 18 }}>
            Ваши поинты: {points}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvitoProfileGamePage;
