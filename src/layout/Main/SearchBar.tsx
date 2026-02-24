import { useState } from "react";
import { useSpotify } from "../../context/SpotfyContext";

export default function SearchBar() {
  const { handleSearch } = useSpotify();
  const [input, setInput] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(input);
    console.log(handleSearch(input));
  }

  return (
    <div className="px-2 w-full max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="inline-flex gap-2 items-center mt-0.5 w-full"
      >
        <h2 className="font-[Audiowide] text-themePurple hidden sm:block">
          Search for your song:
        </h2>
        <input
          name="search"
          id="idInput"
          placeholder="Search on Spotify"
          type="text"
          onChange={handleInput}
          value={input}
          className="px-1"
        />
        <button type="submit" className="px-2">Search</button>
      </form>
    </div>
  );
}
