export function QuizScores({
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
