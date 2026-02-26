import { useState } from "react";
import { useSpotify } from "../../context/SpotfyContext";
import { ScoringData } from "@/data/scoringParameters";
import DrawerComponent from "@/components/ui/drawerComponent";

export default function SearchBar() {
  const {weeklyTheme} = ScoringData
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
        className="inline-flex gap-2 items-end mt-0.5 w-full"
      >
        <h2 className="font-[Audiowide] text-themePurple hidden sm:block text-variableSmaller">
          Search for your song:
        </h2>
        <input
          name="search"
          id="idInput"
          placeholder="Search on Spotify"
          type="text"
          onChange={handleInput}
          value={input}
          className="px-1 text-variableSmaller"
        />
        <button type="submit" className="px-2 text-[clamp(0.4rem,2.5vw,0.6rem)]">Search</button>
         <DrawerComponent/>
      </form>
    </div>
  );
}

/* <div className="flex flex-col justify-center text-themePurple px-0.5 text-[clamp(0.6rem,2.5vw,1rem)]">
          <h2 className="">Weekly Theme:</h2>
          <h2 className=" bg-[rgba(255,255,255,0.42)] text-black font-bold  border shadow-2xl border-green-600 px-2 rounded-2xl">
            {weeklyTheme} Songs
          </h2>
        </div>*/
