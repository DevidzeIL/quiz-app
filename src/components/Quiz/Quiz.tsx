import React, { useState } from "react";
import { QuizProps, Result } from "./types/quiz-types";
import "./Quiz.css";
import { translateText } from "src/utils/translate";
import Spinner from "../UI/Spinner";

const Quiz: React.FC<QuizProps> = ({ quizTheme, data, onFinish, onReset }) => {
  const [quizData, setQuizData] = useState(data);
  const [originalQuizData] = useState(data);
  const [translatedQuizData, setTranslatedQuizData] = useState(data);
  const [isFirstTranslated, setIsFirstTranslated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [results, setResults] = useState<Result[]>([]);
  const [translated, setTranslated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTranslate = async () => {
    setLoading(true);
    if (!translated) {
      if (isFirstTranslated) {
        setQuizData(translatedQuizData);
        setTranslated(true);
      } else {
        const translatedQuestion = await translateText(
          quizData[currentQuestion].question,
          "ru"
        );
        const translatedOptions = await Promise.all(
          Object.entries(quizData[currentQuestion].options).map(
            async ([key, value]) => {
              const translatedOption = await translateText(value, "ru");
              return [key, translatedOption];
            }
          )
        );

        const updatedQuestion = {
          ...quizData[currentQuestion],
          question: translatedQuestion,
          options: Object.fromEntries(translatedOptions),
        };

        setQuizData((prevData) => {
          const updatedData = [...prevData];
          updatedData[currentQuestion] = updatedQuestion;
          return updatedData;
        });
        setTranslatedQuizData((prevData) => {
          const updatedData = [...prevData];
          updatedData[currentQuestion] = updatedQuestion;
          return updatedData;
        });
        setIsFirstTranslated(true);
        setTranslated(true);
      }
    } else {
      setQuizData(originalQuizData);
      setTranslated(false);
    }
    setLoading(false);
  };

  const handleSubmit = (userAnswer: string) => {
    const result: Result = {
      question: data[currentQuestion],
      userAnswer,
    };

    const updatedResults = [...results, result];

    if (currentQuestion < data.length - 1) {
      setResults(updatedResults);
      setCurrentQuestion(currentQuestion + 1);
      setTranslated(false);
    } else {
      onFinish(updatedResults);
    }
  };

  console.log({ data });

  return (
    <div>
      <div className="quiz-header">
        {quizTheme}: {data.length} вопросов.
        {loading && <Spinner />}
      </div>
      <div className="quiz-question">
        <h2>
          {quizData[currentQuestion].number}.{" "}
          {quizData[currentQuestion].question}
        </h2>
        <button onClick={handleTranslate} disabled={loading}>
          {translated ? "Перевести на грузинский" : "Перевести на русский"}
        </button>
      </div>
      <div className="quiz-answers">
        {Object.entries(quizData[currentQuestion].options).map(
          ([key, value]) => (
            <button key={key} onClick={() => handleSubmit(key)}>
              {key}: {value}
            </button>
          )
        )}
      </div>
      <button className="quiz-reset" onClick={onReset}>
        Вернуться в начальное меню
      </button>
    </div>
  );
};

export default Quiz;
