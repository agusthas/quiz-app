import { useState } from "react";
import Quiz from "./Quiz";
import { QuizContextProvider } from "../contexts/QuizContext";

export default function QuizScreen() {
  const [showQuizScreen, setShowQuizScreen] = useState(false);
  const toggleQuizScreen = () => setShowQuizScreen(!showQuizScreen);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <QuizContextProvider setIsFetching={setIsFetching}>
      {showQuizScreen ? (
        <Quiz toggleQuizScreen={toggleQuizScreen} />
      ) : (
        <button
          onClick={toggleQuizScreen}
          type="button"
          className="rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800"
        >
          {isFetching ? "Start" : "Resume"} Quiz
        </button>
      )}
    </QuizContextProvider>
  );
}
