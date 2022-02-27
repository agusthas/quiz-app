// TODO: Refactoring
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useQuiz } from "../../contexts/QuizContext";
import QuizResult from "./QuizResult";
import { APIResponse } from "../../types/quiz";
import { QuizAnswers } from "./QuizAnswers";
import { QuizQuestion } from "./QuizQuestion";
import Loading from "../Loading";
import Error from "../Error";
import { fetcher } from "../../utils/fetcher";

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

export default function Quiz({ toggleShow }: { toggleShow: () => void }) {
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
  } = useQuiz();

  // fetch
  useEffect(() => {
    async function fetchQuiz() {
      const data = await fetcher<APIResponse>(
        "https://opentdb.com/api.php?amount=10"
      );

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

  if (!data) return <Loading />;

  if (data.response_code !== 0) return <Error />;

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
    toggleShow();
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
        <QuizQuestion count={currentCount + 1} question={question} />
        <div className="mt-6 flex items-center justify-center">
          <SVGDivider />
        </div>
        <QuizAnswers
          answers={[correct_answer, ...incorrect_answers]}
          correctAnswer={correct_answer}
          handleClick={handleClick}
          currentCount={currentCount}
        />
      </div>
    </>
  );
}
