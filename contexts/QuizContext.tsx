import { createContext, useContext } from "react";

interface IQuizContext {
  show: boolean;
  toggleShow?: () => void;
}

const defaultState = {
  show: false,
};

export const QuizContext = createContext<IQuizContext>(defaultState);

export const useQuiz = () => {
  return useContext(QuizContext);
};
