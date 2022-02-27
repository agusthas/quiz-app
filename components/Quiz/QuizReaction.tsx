import decodeHtml from "../../utils/decodeHtml";

export function QuizReaction({
  score,
  reset,
}: {
  score: number;
  reset: () => void;
}) {
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
        onClick={reset}
        className="peer rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800"
      >
        {isPerfect ? "Back to start" : "Try Again"}
      </button>
    </div>
  );
}
