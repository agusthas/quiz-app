import { useEffect, useState } from "react";

type Props = {
  handleSubmit: (n: string) => (e: React.SyntheticEvent) => void;
};

export default function Form({ handleSubmit }: Props) {
  const [name, setName] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    name.length > 2 ? setShowButton(true) : setShowButton(false);
  }, [name]);

  return (
    <form
      className="flex items-center justify-center rounded-lg bg-gray-600 p-4 text-green-100"
      onSubmit={handleSubmit(name)}
    >
      <div>
        <label htmlFor="username" className="mr-4 text-lg">
          Who are you?
        </label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md bg-gray-700 text-lg text-green-100 focus:border-green-400 focus:ring-green-400"
        />
      </div>
      <button
        type="submit"
        className={`${
          showButton
            ? "ml-5 max-w-[10em] rounded-lg border border-green-100 px-5 py-2.5"
            : "max-w-0"
        } overflow-hidden text-center tracking-wide text-green-100 transition-all duration-300 hover:border-green-400 hover:bg-green-400 hover:text-gray-800`}
      >
        Login
      </button>
    </form>
  );
}
