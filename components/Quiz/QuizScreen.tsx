import { useState } from "react";
import { QuizContextProvider } from "../../contexts/QuizContext";
import Quiz from "./Quiz";

export default function QuizScreen() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <QuizContextProvider>
      {show ? (
        <Quiz toggleShow={toggleShow} />
      ) : (
        <button
          onClick={toggleShow}
          type="button"
          className="rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800"
        >
          Start Quiz
        </button>
      )}
    </QuizContextProvider>
  );
}
