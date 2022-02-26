import { useState } from "react";
import { useTimer } from "react-timer-hook";
import useFetch from "../hooks/useFetch";
import decodeHtml from "../utils/decodeHtml";
import QuizResult from "./QuizResult";

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
        Question #{count + 1}
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
}: {
  answers: string[];
  correctAnswer: string;
  handleClick: (isCorrect: boolean) => () => void;
}) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {answers.map((ans, i) => (
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

interface APIResponse {
  response_code: number;
  results: Question[];
}

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Quiz() {
  const { data, error } = useFetch<APIResponse>(
    "https://opentdb.com/api.php?amount=10"
  );
  const [currentCount, setCurrentCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const { seconds, minutes } = useTimer({
    expiryTimestamp: (() => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 10);
      return time;
    })(),
    onExpire: () => {
      setShowResult(true);
    },
  });

  if (error) {
    return <div className="text-9xl uppercase text-red-400">Error</div>;
  }

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

  return showResult ? (
    <QuizResult
      correct={score}
      answered={answered}
      incorrect={answered - score}
    />
  ) : (
    <>
      <p className="rounded-lg bg-gray-700 py-1 px-4 text-2xl font-bold tracking-wider text-green-400">
        {minutes}m {seconds}s
      </p>
      <div className="mt-4 flex max-w-[600px] flex-col rounded-lg bg-gray-600 py-10 px-4 text-center shadow-2xl sm:px-10">
        <Question count={currentCount} question={question} />
        <div className="mt-6 flex items-center justify-center">
          <SVGDivider />
        </div>
        <Answers
          answers={[correct_answer, ...incorrect_answers]}
          correctAnswer={correct_answer}
          handleClick={handleClick}
        />
      </div>
    </>
  );
}
