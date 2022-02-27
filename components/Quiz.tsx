// TODO: Refactoring
import { useEffect, useMemo, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useQuiz } from "../contexts/QuizContext";
import decodeHtml from "../utils/decodeHtml";
import shuffle from "../utils/shuffle";
import QuizResult from "./QuizResult";
import { APIResponse } from "../types/quiz";

function SVGDivider() {
  return (
    <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
        <g transform="translate(138)" fill="#CEE3E9">
          <rect width="6" height="16" rx="3" />
          <rect x="14" width="6" height="16" rx="3" />
        </g>
      </g>
    </svg>
  );
}

function Question({ count, question }: { count: number; question: string }) {
  return (
    <div className="text-center font-extrabold">
      <h2 className="text-sm uppercase tracking-[0.35rem] text-green-400">
        Question #{count}
      </h2>
      <p className="mt-6 text-2xl leading-snug text-green-100 sm:text-[1.75rem]">
        {decodeHtml(question)}
      </p>
    </div>
  );
}

function Answers({
  answers,
  correctAnswer,
  handleClick,
  currentCount,
}: {
  answers: string[];
  currentCount: number;
  correctAnswer: string;
  handleClick: (isCorrect: boolean) => () => void;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ansMemo = useMemo(() => shuffle(answers), [currentCount]);

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {ansMemo.map((ans, i) => (
        <button
          key={i}
          type="button"
          onClick={handleClick(ans === correctAnswer)}
          className="rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800"
        >
          {decodeHtml(ans)}
        </button>
      ))}
    </div>
  );
}

export default function Quiz() {
  const [showResult, setShowResult] = useState(false);
  const {
    currentCount,
    setCurrentCount,
    score,
    setScore,
    answered,
    setAnswered,
    data,
    setData,
    toggleShow,
  } = useQuiz();

  // fetch
  useEffect(() => {
    async function fetchQuiz() {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = (await response.json()) as APIResponse;

      setData(data);
    }

    if (!data) {
      void fetchQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // TODO: this can be made into its own components
  const { seconds, minutes } = useTimer({
    expiryTimestamp: (() => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 60);
      return time;
    })(),
    onExpire: () => {
      setShowResult(true);
    },
  });

  if (!data) {
    return (
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-400 border-t-transparent"></div>
    );
  }

  if (data.response_code !== 0) {
    return <div className="text-9xl uppercase text-red-400">Error</div>;
  }

  const { question, correct_answer, incorrect_answers } =
    data.results[currentCount];

  const handleClick = (isCorrect: boolean) => () => {
    if (isCorrect) {
      setScore(score + 1);
      setAnswered(answered + 1);
    } else {
      setAnswered(answered + 1);
    }

    if (currentCount < data.results.length - 1) {
      setCurrentCount(currentCount + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    toggleShow && toggleShow();
    setCurrentCount(0);
    setScore(0);
    setAnswered(0);
    setData(null);
  };

  return showResult ? (
    <QuizResult
      correct={score}
      answered={answered}
      incorrect={answered - score}
      reset={handleReset}
    />
  ) : (
    <>
      <p className="rounded-lg bg-gray-700 py-1 px-4 text-2xl font-bold tracking-wider text-green-400">
        {minutes}m {seconds}s
      </p>
      <div className="mt-4 flex max-w-[600px] flex-col rounded-lg bg-gray-600 py-10 px-4 text-center shadow-2xl sm:px-10">
        <Question count={currentCount + 1} question={question} />
        <div className="mt-6 flex items-center justify-center">
          <SVGDivider />
        </div>
        <Answers
          answers={[correct_answer, ...incorrect_answers]}
          correctAnswer={correct_answer}
          handleClick={handleClick}
          currentCount={currentCount}
        />
      </div>
    </>
  );
}
