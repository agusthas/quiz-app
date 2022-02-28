type Props = {
  seconds: number;
  minutes: number;
};

export default function QuizTimer({ seconds, minutes }: Props) {
  return (
    <p className="rounded-lg bg-gray-700 py-1 px-4 text-2xl font-bold tracking-wider text-green-400">
      {minutes}m {seconds}s
    </p>
  );
}
