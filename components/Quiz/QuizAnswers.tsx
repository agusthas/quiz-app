import { useMemo } from "react";
import decodeHtml from "../../utils/decodeHtml";
import shuffle from "../../utils/shuffle";

export function QuizAnswers({
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
