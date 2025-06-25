import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const AvitoProfileMessages = () => {
  const messages = [
    {
      id: 1,
      userName: "Анна Смирнова",
      productTitle: "iPhone 14 Pro 128GB",
      lastMessage: "Добрый день! Можно посмотреть телефон завтра?",
      time: "2 часа назад",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9fcf7cf?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 2,
      userName: "Дмитрий Козлов",
      productTitle: "MacBook Air M2",
      lastMessage: "Спасибо за покупку! Оставлю отзыв.",
      time: "1 день назад",
      unread: false,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 3,
      userName: "Елена Петрова",
      productTitle: "Диван угловой",
      lastMessage: "Актуально? Могу приехать сегодня.",
      time: "3 дня назад",
      unread: true,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Сообщения</h1>
        <Badge variant="secondary">
          {messages.filter((m) => m.unread).length} непрочитанных
        </Badge>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={message.unread ? "border-blue-200" : ""}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={message.avatar}
                  alt={message.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{message.userName}</h3>
                      <p className="text-sm text-gray-600">
                        {message.productTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {message.time}
                      </span>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{message.lastMessage}</p>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Icon name="MessageCircle" size={14} className="mr-2" />
                      Ответить
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Phone" size={14} className="mr-2" />
                      Позвонить
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvitoProfileMessages;
