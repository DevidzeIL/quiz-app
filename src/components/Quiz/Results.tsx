import React from "react";
import { ResultsProps } from "./types/quiz-types";

const getOptionText = (
  options: { a: string; b: string; c: string; d: string },
  key: string
): string => {
  return options[key as keyof typeof options];
};

const Results: React.FC<ResultsProps> = ({ quizTheme, results, onReset }) => {
  const incorrectAnswers = results.filter(
    (result) => result.question.answer !== result.userAnswer
  );

  const correctAnswers = results.length - incorrectAnswers.length;
  const totalAnswers = results.length;

  return (
    <div>
      <h3>
        {quizTheme}: Кол-во правильных ответов: {correctAnswers} из{" "}
        {totalAnswers}
      </h3>
      {totalAnswers > correctAnswers ? (
        <>
          <h3>Неправильные ответы:</h3>
          {incorrectAnswers.map((result, index) => (
            <div key={index}>
              <h4>{result.question.question}</h4>
              <p>
                Ваш ответ:{" "}
                {getOptionText(result.question.options, result.userAnswer)}
                <br />
                Правильный ответ:{" "}
                {getOptionText(result.question.options, result.question.answer)}
              </p>
            </div>
          ))}
        </>
      ) : (
        <h1>
          Поздравляю! <br /> Вы успешно ответили на все вопросы!
        </h1>
      )}
      <button className="quiz-reset" onClick={onReset}>
        Вернуться в начальное меню
      </button>
    </div>
  );
};

export default Results;
