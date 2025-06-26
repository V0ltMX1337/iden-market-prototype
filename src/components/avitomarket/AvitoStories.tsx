import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const stories = [
  {
    id: 1,
    title: "Не удаляйте приложение",
    image: "https://placehold.co/100x100?text=App",
    content: "Сохраняйте доступ к объявлениям где угодно!",
  },
  {
    id: 2,
    title: "#яПомогаю",
    image: "https://placehold.co/100x100?text=❤️",
    content: "Присоединяйтесь к добрым делам с Avito",
  },
  {
    id: 3,
    title: "Дарим подарки",
    image: "https://placehold.co/100x100?text=🎁",
    content: "Новые бонусы для пользователей каждую неделю",
  },
  {
    id: 4,
    title: "Всё сложится с Avito",
    image: "https://placehold.co/100x100?text=🧩",
    content: "История успеха наших пользователей",
  },
  {
    id: 5,
    title: "Подберём оборудование",
    image: "https://placehold.co/100x100?text=🔧",
    content: "Каталог техники с рекомендациями",
  },
];

const AvitoStories = () => {
  const [openStory, setOpenStory] = useState<null | typeof stories[0]>(null);

  return (
    <>
      <section className="overflow-x-auto py-6">
        <h2 className="text-2xl font-bold mb-4">Обновления сервиса</h2>
        <div className="flex space-x-6 px-4 sm:px-8">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setOpenStory(story)}
              className="flex flex-col items-center shrink-0 cursor-pointer"
            >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-red-400 overflow-hidden shadow">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs sm:text-sm mt-2 text-center max-w-[80px] leading-tight">{story.title}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Модалка сториса */}
      <Dialog open={!!openStory} onOpenChange={() => setOpenStory(null)}>
        <DialogContent className="max-w-sm text-center">
          {openStory && (
            <>
              <img
                src={openStory.image}
                alt={openStory.title}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{openStory.title}</h3>
              <p className="text-gray-600">{openStory.content}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvitoStories;
