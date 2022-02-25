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
      <p
        className="mt-6 text-2xl leading-snug text-green-100 sm:text-[1.75rem]"
        dangerouslySetInnerHTML={{ __html: question }}
      ></p>
    </div>
  );
}

function Answers({
  answers,
  handleClick,
}: {
  answers: string[];
  handleClick: () => void;
}) {
  console.log(answers);
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {answers.map((ans, i) => (
        <button
          key={i}
          type="button"
          onClick={handleClick}
          className="rounded-lg border border-green-100 px-5 py-2.5 text-center font-medium tracking-wide text-green-100 hover:border-green-400 hover:bg-green-400 hover:text-gray-800 focus:ring-4 focus:ring-green-200"
          dangerouslySetInnerHTML={{ __html: ans }}
        ></button>
      ))}
    </div>
  );
}

export default function Quiz() {
  return (
    <div className="flex max-w-[600px] flex-col rounded-lg bg-gray-600 py-10 px-4 text-center shadow-2xl sm:px-10">
      <Question
        count={0}
        question={
          "How many legs is it biologically impossible for a centipede to have?"
        }
      />
      <div className="mt-6 flex items-center justify-center">
        <SVGDivider />
      </div>
      <Answers
        answers={[
          "Alex Mercer",
          "Dana Mercer",
          "Any Goliaths roaming around",
          "James Heller",
        ]}
        handleClick={() => alert("clicked")}
      />
    </div>
  );
}
