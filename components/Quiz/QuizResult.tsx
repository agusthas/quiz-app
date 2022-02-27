import { QuizReaction } from "./QuizReaction";
import { QuizScores } from "./QuizScores";

type Props = {
  correct: number;
  incorrect: number;
  answered: number;
  reset: () => void;
};

export default function QuizResult({
  correct,
  incorrect,
  answered,
  reset,
}: Props) {
  const score = +((correct / answered) * 100).toFixed(2); // i'm not that good with math

  return (
    <div className="">
      <h2 className="sr-only">RESULT</h2>
      <p className="text-center text-3xl tracking-wide text-green-100">
        Out of <span className="text-4xl font-bold">{answered}</span> question
        answered, you got
      </p>
      <QuizScores correct={correct} incorrect={incorrect} />
      <QuizReaction score={score} reset={reset} />
    </div>
  );
}
