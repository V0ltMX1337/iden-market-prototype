import Icon from "@/components/ui/icon";

export interface Transaction {
  id: number;
  type: "sale" | "payout" | "commission";
  amount: number;
  date: string;
  description: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return "TrendingUp";
      case "payout":
        return "ArrowDownLeft";
      case "commission":
        return "Percent";
      default:
        return "Circle";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-green-600";
      case "payout":
        return "text-blue-600";
      case "commission":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full bg-gray-100 ${getTransactionColor(transaction.type)}`}
        >
          <Icon name={getTransactionIcon(transaction.type) as any} size={16} />
        </div>
        <div>
          <p className="font-medium">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
      </div>
      <div
        className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
      >
        {transaction.amount > 0 ? "+" : ""}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
