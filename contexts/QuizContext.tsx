/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { APIResponse } from "../types/quiz";
import { SetState } from "../types/setState";

interface IQuizContext {
  data: APIResponse | null;
  setData: SetState<APIResponse | null>;
  currentCount: number;
  score: number;
  answered: number;
  setCurrentCount: SetState<number>;
  setScore: SetState<number>;
  setAnswered: SetState<number>;
}

const QuizContext = createContext<IQuizContext>({
  currentCount: 0,
  score: 0,
  answered: 0,
  data: null,
  setData: () => {},
  setScore: () => {},
  setCurrentCount: () => {},
  setAnswered: () => {},
});

export function QuizContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentCount, setCurrentCount] = useLocalStorage("currentCount", 0);
  const [score, setScore] = useLocalStorage("score", 0);
  const [answered, setAnswered] = useLocalStorage("answered", 0);
  const [data, setData] = useLocalStorage<APIResponse | null>("quiz", null);

  return (
    <QuizContext.Provider
      value={{
        currentCount,
        setCurrentCount,
        answered,
        setAnswered,
        score,
        setScore,
        data,
        setData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  return useContext(QuizContext);
};
