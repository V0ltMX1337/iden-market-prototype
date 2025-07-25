import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AskSellerProps {
  messageText: string;
  setMessageText: (text: string) => void;
  selectedQuestion: string | null;
  setSelectedQuestion: (question: string | null) => void;
  questions: string[];
  onSendMessage: (message: string) => void;
}

const AskSeller = ({
  messageText,
  setMessageText,
  selectedQuestion,
  setSelectedQuestion,
  questions,
  onSendMessage,
}: AskSellerProps) => {
  const handleSend = () => {
    if (messageText.trim() === "") return;
    onSendMessage(messageText);
    setMessageText("");
    setSelectedQuestion(null);
  };

  return (
    <Card className="mt-6 h-fit">
      <CardContent className="p-4">
        <h3 className="font-bold mb-3">Задать вопрос продавцу</h3>

        {questions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {questions.map((q, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedQuestion(q);
                  setMessageText(q);
                }}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedQuestion === q
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <textarea
          rows={4}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Напишите ваше сообщение..."
          className="w-full border rounded-md p-2 resize-none"
        />
        <Button
          className="mt-3 w-full h-10 bg-green-600 hover:bg-green-700 text-white font-semibold"
          onClick={handleSend}
        >
          Отправить
        </Button>
      </CardContent>
    </Card>
  );
};

export default AskSeller;
