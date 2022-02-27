import decodeHtml from "../../utils/decodeHtml";

export function QuizQuestion({
  count,
  question,
}: {
  count: number;
  question: string;
}) {
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
