import { useQuiz } from "../contexts/QuizContext";
import decodeHtml from "../utils/decodeHtml";

function Reaction({ score }: { score: number }) {
  const { toggleShow } = useQuiz();

  const scoreInRange = <T extends number>(min: T, max: T) =>
    (score - min) * (score - max) <= 0;

  let reaction: string;
  let isPerfect = false;
  if (score === 100) {
    reaction = "WHAT!? A perfect score? You are such a beast! 🔞🔞";
    isPerfect = true;
  } else if (scoreInRange(0, 25)) {
    reaction = "Well.. you can always try again? 😁";
  } else if (scoreInRange(26, 50)) {
    reaction = "So-so i guess, wanna try again? 😂";
  } else if (scoreInRange(51, 75)) {
    reaction = "Halfway there! Try again and you will do better! 😎";
  } else {
    reaction = "Whoops, so close. Why not try again? 🤐";
  }

  return (
    <div className="relative mt-8 flex flex-col items-center justify-center space-y-3">
      <div className="flex flex-col text-center text-lg tracking-wide text-green-100">
        <p>{decodeHtml(reaction)}</p>
      </div>
      <button
        type="button"
        onClick={toggleShow}
        className="peer rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800"
      >
        {isPerfect ? "Back to start" : "Try Again"}
      </button>
    </div>
  );
}

function Scores({
  correct,
  incorrect,
}: {
  correct: number;
  incorrect: number;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-12">
      <div className="">
        <p className="min-w-[10rem] rounded-lg bg-gray-700 py-6 text-center text-9xl font-bold text-green-500 shadow-lg">
          {correct}
        </p>
        <p className="mt-4 text-center text-lg font-semibold uppercase tracking-wide text-green-500">
          Correct
        </p>
      </div>
      <div className="">
        <p className="min-w-[10rem] rounded-lg bg-gray-700 py-6 text-center text-9xl font-bold text-rose-600 shadow-lg">
          {incorrect}
        </p>
        <p className="mt-4 text-center text-xl font-semibold uppercase tracking-wide text-rose-600">
          False
        </p>
      </div>
    </div>
  );
}

type Props = {
  correct: number;
  incorrect: number;
  answered: number;
};

export default function QuizResult({ correct, incorrect, answered }: Props) {
  const score = +((correct / answered) * 100).toFixed(2); // i'm not that good with math

  return (
    <div className="">
      <h2 className="sr-only">RESULT</h2>
      <p className="text-center text-3xl tracking-wide text-green-100">
        Out of <span className="text-4xl font-bold">{answered}</span> question
        answered, you got
      </p>
      <Scores correct={correct} incorrect={incorrect} />
      <Reaction score={score} />
    </div>
  );
}
