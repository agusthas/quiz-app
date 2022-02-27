import { useState } from "react";
import { QuizContext } from "../contexts/QuizContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { APIResponse } from "../types/quiz";
import Quiz from "./Quiz";

function StartQuizButton({
  toggleQuizScreen,
}: {
  toggleQuizScreen: () => void;
}) {
  return (
    <button
      onClick={toggleQuizScreen}
      type="button"
      className="rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800"
    >
      Start Quiz
    </button>
  );
}

export default function QuizScreen() {
  const [showQuizScreen, setShowQuizScreen] = useState(false);
  const toggleQuizScreen = () => {
    setShowQuizScreen(!showQuizScreen);
  };
  const [currentCount, setCurrentCount] = useLocalStorage("currentCount", 0);
  const [score, setScore] = useLocalStorage("score", 0);
  const [answered, setAnswered] = useLocalStorage("answered", 0);
  const [data, setData] = useLocalStorage<APIResponse | null>("quiz", null);

  return (
    <QuizContext.Provider
      value={{
        show: showQuizScreen,
        toggleShow: toggleQuizScreen,
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
      {showQuizScreen ? (
        <Quiz />
      ) : (
        <StartQuizButton toggleQuizScreen={toggleQuizScreen} />
      )}
    </QuizContext.Provider>
  );
}
