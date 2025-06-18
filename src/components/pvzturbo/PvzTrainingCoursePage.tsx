import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PvzTrainingCoursePage = () => {
  const lectures = [
    <>
      <h2 className="text-3xl font-extrabold mb-4">Введение в систему ПВЗ</h2>
      <p className="text-lg leading-relaxed">
        Добро пожаловать в обучающий курс по работе с Пунктом выдачи заказов.
        Здесь вы получите все необходимые знания для успешной работы.
      </p>
    </>,
    <>
      <h2 className="text-3xl font-extrabold mb-4">Процесс выдачи заказов</h2>
      <p className="text-lg leading-relaxed">
        Узнайте как правильно принимать, проверять и выдавать заказы клиентам.
      </p>
    </>,
    <>
      <h2 className="text-3xl font-extrabold mb-4">Обработка возвратов</h2>
      <p className="text-lg leading-relaxed">
        Основные правила возврата от клиентов и продавцов, а также что делать в спорных ситуациях.
      </p>
    </>,
  ];

  const questions = [
    {
      question: "Что делать при повреждении посылки?",
      options: ["Сообщить менеджеру", "Игнорировать", "Вернуть отправителю"],
      correctIndex: 0,
    },
    {
      question: "Как долго обрабатывать возврат?",
      options: ["2 часа", "1 день", "Неделя"],
      correctIndex: 1,
    },
    {
      question: "Что нужно сделать перед выдачей заказа?",
      options: [
        "Проверить целостность и документы",
        "Отдать сразу",
        "Отложить без проверки",
      ],
      correctIndex: 0,
    },
  ];

  const [page, setPage] = useState(0);
  const totalPages = lectures.length + 1;

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qIndex, optionIndex) => {
    if (showResult) return; // запретить менять после завершения
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const canNext = () => {
    if (page < lectures.length) return true;
    if (page === lectures.length) return answers.every((a) => a !== null);
    return false;
  };

  const handleNext = () => {
    if (page < lectures.length) {
      setPage((p) => p + 1);
    } else if (page === lectures.length && canNext()) {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((p) => p - 1);
      setShowResult(false);
    }
  };

  const wrongAnswers = answers
    .map((a, i) => (a !== questions[i].correctIndex ? i : -1))
    .filter((i) => i !== -1);

  const passed = wrongAnswers.length < 3;

  const restartTest = () => {
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
    setPage(lectures.length);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col flex-grow p-8 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 overflow-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight text-gray-900 drop-shadow-md">
        Обучающий курс Пункта выдачи заказов
      </h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-6 py-3 rounded-lg bg-white shadow-md text-yellow-600 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-100 transition"
        >
          Назад
        </button>
        <div className="text-gray-900 font-semibold text-lg select-none">
          Страница {page + 1} из {totalPages}
        </div>
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`px-6 py-3 rounded-lg font-semibold shadow-md transition ${
            canNext()
              ? "bg-yellow-600 text-white hover:bg-yellow-700"
              : "bg-yellow-300 text-yellow-700 cursor-not-allowed"
          }`}
        >
          {page < lectures.length ? "Далее" : "Завершить тест"}
        </button>
      </div>

      <div className="flex-1 bg-white rounded-xl p-8 shadow-inner overflow-auto">
        <AnimatePresence mode="wait">
          {!showResult && page < lectures.length && (
            <motion.div
              key={`lecture-${page}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="prose max-w-none text-gray-900"
            >
              {lectures[page]}
            </motion.div>
          )}

          {!showResult && page === lectures.length && (
            <motion.div
              key="test"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-gray-900"
            >
              <h2 className="text-3xl font-bold mb-6">Тест</h2>
              {questions.map((q, i) => (
                <div key={i} className="mb-6 p-5 border rounded-lg shadow-sm transition">
                  <p className="font-semibold mb-3 text-lg">
                    {i + 1}. {q.question}
                  </p>
                  <div className="flex flex-col gap-3">
                    {q.options.map((opt, idx) => {
                      const isSelected = answers[i] === idx;
                      return (
                        <label
                          key={idx}
                          className={`cursor-pointer px-4 py-3 rounded-lg border transition
                          ${
                            isSelected
                              ? "bg-yellow-500 text-black border-yellow-500 font-semibold"
                              : "bg-white border-gray-300 hover:bg-yellow-50"
                          }
                        `}
                        >
                          <input
                            type="radio"
                            name={`q-${i}`}
                            checked={isSelected}
                            onChange={() => handleAnswer(i, idx)}
                            className="hidden"
                            disabled={showResult}
                          />
                          {opt}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {showResult && (
            <motion.div
              key="result"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-yellow-50 p-8 rounded-xl shadow-lg text-gray-900 space-y-6"
            >
              <h2
                className={`text-4xl font-extrabold ${
                  passed ? "text-green-600" : "text-red-600"
                }`}
              >
                {passed ? "Поздравляем! Тест пройден." : "Тест не пройден."}
              </h2>
              <p className="text-xl">
                Ошибок: <strong>{wrongAnswers.length}</strong> из {questions.length}
              </p>

              {wrongAnswers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-2xl mb-4">Ошибки:</h3>
                  <ul className="list-disc list-inside space-y-4 max-h-72 overflow-auto">
                    {wrongAnswers.map((i) => (
                      <li key={i} className="bg-red-100 p-5 rounded-lg shadow-inner">
                        <p className="font-semibold text-lg mb-1">
                          Вопрос {i + 1}: {questions[i].question}
                        </p>
                        <p>
                          Ваш ответ:{" "}
                          <span className="text-red-700 font-semibold">
                            {questions[i].options[answers[i]]}
                          </span>
                        </p>
                        <p>
                          Правильный ответ:{" "}
                          <span className="text-green-700 font-semibold">
                            {questions[i].options[questions[i].correctIndex]}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!passed && (
                <button
                  onClick={restartTest}
                  className="mt-6 bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-yellow-700 transition"
                >
                  Пройти тест заново
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PvzTrainingCoursePage;
