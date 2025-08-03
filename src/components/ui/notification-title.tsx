import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";

interface NotificationTitleProps {
  originalTitle: string;
}

export const NotificationTitle = ({ originalTitle }: NotificationTitleProps) => {
  const { hasUnread, count } = useUnreadMessages();
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (hasUnread) {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsBlinking(false);
    }
  }, [hasUnread]);

  const title = hasUnread && isBlinking
    ? `❗ ${count} непрочитанное сообщение`
    : originalTitle;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="Trivo — платформа бесплатных объявлений. Быстро и удобно размещайте объявления по всей России!" />
      <link rel="canonical" href="https://trivoads.ru/" />
    </Helmet>
  );
};
