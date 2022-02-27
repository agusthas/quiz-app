/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from "react";
import { APIResponse } from "../types/quiz";
import { SetState } from "../types/setState";

interface IQuizContext {
  show: boolean;
  toggleShow?: () => void;
  data: APIResponse | null;
  setData: SetState<APIResponse | null>;
  currentCount: number;
  score: number;
  answered: number;
  setCurrentCount: SetState<number>;
  setScore: SetState<number>;
  setAnswered: SetState<number>;
}

export const QuizContext = createContext<IQuizContext>({
  show: false,
  currentCount: 0,
  score: 0,
  answered: 0,
  data: null,
  setData: () => {},
  setScore: () => {},
  setCurrentCount: () => {},
  setAnswered: () => {},
});

export const useQuiz = () => {
  return useContext(QuizContext);
};
