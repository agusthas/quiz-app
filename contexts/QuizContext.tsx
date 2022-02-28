/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
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
  setIsFetching,
}: {
  children: React.ReactNode;
  setIsFetching: SetState<boolean>;
}) {
  const [currentCount, setCurrentCount] = useLocalStorage("currentCount", 0);
  const [score, setScore] = useLocalStorage("score", 0);
  const [answered, setAnswered] = useLocalStorage("answered", 0);
  const [data, setData] = useLocalStorage<APIResponse | null>("quiz", null);

  useEffect(() => {
    async function fetchQuiz() {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = (await response.json()) as APIResponse;

      setData(data);
      setIsFetching(true);
    }

    if (!data) {
      void fetchQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) return <Loading />;

  if (data.response_code !== 0) return <Error />;

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
