import Icon from "@/components/ui/icon";
import BalanceCard from "./finance/BalanceCard";
import TransactionHistory from "./finance/TransactionHistory";
import { Transaction } from "./finance/TransactionItem";

const AdminFinance = () => {
  const balanceData = {
    available: 245680,
    pending: 89420,
    lastPayout: 156700,
    payoutDate: "2025-05-25",
  };

  const transactions: Transaction[] = [
    {
      id: 1,
      type: "sale",
      amount: 12500,
      date: "2025-05-30",
      description: "Заказ #1047",
    },
    {
      id: 2,
      type: "payout",
      amount: -156700,
      date: "2025-05-25",
      description: "Выплата на карту",
    },
    {
      id: 3,
      type: "sale",
      amount: 8900,
      date: "2025-05-29",
      description: "Заказ #1046",
    },
    {
      id: 4,
      type: "sale",
      amount: 15600,
      date: "2025-05-28",
      description: "Заказ #1045",
    },
    {
      id: 5,
      type: "commission",
      amount: -1250,
      date: "2025-05-27",
      description: "Комиссия платформы",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Финансы</h2>
        <p className="text-gray-600">Управление балансом и движением средств</p>
      </div>

      {/* Баланс кабинета */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard
          title="Доступно к выплате"
          amount={balanceData.available}
          description="Готово к выводу"
          icon="Wallet"
          colorClass="text-green-600"
        />
        <BalanceCard
          title="В обработке"
          amount={balanceData.pending}
          description="Ожидает подтверждения"
          icon="Clock"
          colorClass="text-yellow-600"
        />
        <BalanceCard
          title="Последняя выплата"
          amount={balanceData.lastPayout}
          description={balanceData.payoutDate}
          icon="ArrowDownLeft"
        />
      </div>

      {/* Кнопка вывода средств */}
      <div className="flex justify-end">
        <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center gap-2">
          <Icon name="Download" size={16} />
          Вывести средства
        </button>
      </div>

      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default AdminFinance;
