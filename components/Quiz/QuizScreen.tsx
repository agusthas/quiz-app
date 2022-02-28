import { useState } from "react";
import Quiz from "./Quiz";
import { QuizContextProvider } from "../../contexts/QuizContext";

// TODO: rename isFetching variable to more makes sense
export default function QuizScreen() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <QuizContextProvider setIsFetching={setIsFetching}>
      {show ? (
        <Quiz toggleShow={toggleShow} />
      ) : (
        <button
          onClick={toggleShow}
          type="button"
          className="rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800"
        >
          {isFetching ? "Start" : "Resume"} Quiz
        </button>
      )}
    </QuizContextProvider>
  );
}
