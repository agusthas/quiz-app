import { useEffect, useState } from "react";
import QuizResult from "./QuizResult";
import { QuizAnswers } from "./QuizAnswers";
import { QuizQuestion } from "./QuizQuestion";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useTimer } from "react-timer-hook";
import { useQuiz } from "../../contexts/QuizContext";
import QuizTimer from "./QuizTimer";

function SVGDivider() {
  return (
    <div className="mt-6 flex items-center justify-center">
      <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
          <g transform="translate(138)" fill="#CEE3E9">
            <rect width="6" height="16" rx="3" />
            <rect x="14" width="6" height="16" rx="3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

const DEFAULT_TIMER = 60; // in seconds

export default function Quiz({
  toggleQuizScreen,
}: {
  toggleQuizScreen: () => void;
}) {
  const quiz = useQuiz();
  const [showResult, setShowResult] = useState(false);
  const [seconds, setSeconds] = useLocalStorage("seconds", DEFAULT_TIMER);

  const timer = useTimer({
    expiryTimestamp: (() => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + seconds);
      return time;
    })(),
    onExpire: () => {
      setShowResult(true);
      setSeconds(DEFAULT_TIMER);
    },
  });

  useEffect(() => {
    setSeconds(timer.seconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.seconds]);

  const handleTimerReset = () => {
    setSeconds(DEFAULT_TIMER);
    timer.pause();
  };

  if (!quiz.data) {
    return (
      <div className="text-center text-3xl font-extrabold text-red-400">
        When am i called?
      </div>
    );
  }

  const { question, correct_answer, incorrect_answers } =
    quiz.data.results[quiz.currentCount];

  const handleClick = (isCorrect: boolean) => () => {
    if (isCorrect) {
      quiz.setScore(quiz.score + 1);
      quiz.setAnswered(quiz.answered + 1);
    } else {
      quiz.setAnswered(quiz.answered + 1);
    }

    if (!quiz.data) throw new Error("When is this called?");

    if (quiz.currentCount < quiz.data.results.length - 1) {
      quiz.setCurrentCount(quiz.currentCount + 1);
    } else {
      handleTimerReset();
      setShowResult(true);
    }
  };

  const handleReset = () => {
    toggleQuizScreen();
    handleTimerReset();
    quiz.setCurrentCount(0);
    quiz.setScore(0);
    quiz.setAnswered(0);
    quiz.setData(null);
  };

  return showResult ? (
    <QuizResult
      correct={quiz.score}
      answered={quiz.answered}
      incorrect={quiz.answered - quiz.score}
      reset={handleReset}
    />
  ) : (
    <>
      <QuizTimer seconds={timer.seconds} minutes={timer.minutes} />
      <div className="mt-4 flex max-w-[600px] flex-col rounded-lg bg-gray-600 py-10 px-4 text-center shadow-2xl sm:px-10">
        <QuizQuestion
          count={quiz.currentCount + 1}
          question={question}
          totalQuestion={quiz.data.results.length}
        />
        <SVGDivider />
        <QuizAnswers
          answers={[correct_answer, ...incorrect_answers]}
          correctAnswer={correct_answer}
          handleClick={handleClick}
          currentCount={quiz.currentCount}
        />
      </div>
    </>
  );
}
