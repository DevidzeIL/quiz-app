import { ContentLayout } from "src/components/Layout";
import { useState } from "react";
import { Question, Result } from "src/components/Quiz/types/quiz-types";

import quiz_history from "src/assets/quiz/quiz_history.json";
import quiz_law from "src/assets/quiz/quiz_law.json";
import quiz_language from "src/assets/quiz/quiz_language.json";
import quiz_test from "src/assets/quiz/quiz_test.json";
import Quiz from "src/components/Quiz/Quiz";
import Results from "src/components/Quiz/Results";

export const Home = () => {
  const [quizData, setQuizData] = useState<Question[] | null>(null);
  const [quizTheme, setQuizTheme] = useState("");
  const [quizResults, setQuizResults] = useState<Result[] | null>(null);

  const resetQuiz = () => {
    setQuizData(null);
    setQuizResults(null);
  };

  const handleCategorySelect = (
    category: "history" | "law" | "language" | "test"
  ) => {
    let selectedData: Question[];

    switch (category) {
      case "history":
        selectedData = quiz_history as Question[];
        setQuizTheme("История");
        break;
      case "law":
        selectedData = quiz_law as Question[];
        setQuizTheme("Право");
        break;
      case "language":
        selectedData = quiz_language as Question[];
        setQuizTheme("Грузинский язык");
        break;
      case "test":
        selectedData = quiz_test as Question[];
        setQuizTheme("Test");
        break;
    }

    setQuizData(selectedData);
  };
  return (
    <>
      <ContentLayout title="Home">
        <div className="content-layout-body">
          {!quizData && !quizResults && (
            <div>
              <button onClick={() => handleCategorySelect("history")}>
                История
              </button>
              <button onClick={() => handleCategorySelect("law")}>Право</button>
              <button onClick={() => handleCategorySelect("language")}>
                Грузинский язык
              </button>
              <button onClick={() => handleCategorySelect("test")}>Тест</button>
            </div>
          )}
          {quizData && !quizResults && (
            <Quiz
              quizTheme={quizTheme}
              data={quizData}
              onFinish={(results: Result[]) => setQuizResults(results)}
              onReset={resetQuiz}
            />
          )}
          {quizResults && (
            <Results
              quizTheme={quizTheme}
              results={quizResults}
              onReset={resetQuiz}
            />
          )}
        </div>
      </ContentLayout>
    </>
  );
};
