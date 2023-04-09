export type Question = {
  number: string;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  answer: string;
};

export type QuizProps = {
  quizTheme: string;
  data: Question[];
  onFinish: (results: Result[]) => void;
  onReset: () => void;
};

export type Result = {
  question: Question;
  userAnswer: string;
};

export type ResultsProps = {
  quizTheme: string;
  results: Result[];
  onReset: () => void;
};
