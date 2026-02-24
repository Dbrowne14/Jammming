import { ScoringData } from "../../data/scoringParameters";

const Header = () => {
  const { weeklyTheme } = ScoringData;
  return (
    <header className="flex flex-col gap-2 justify-center items-center my-5">
      <div className="inline-flex gap-2 h-14 items-center">
        <img src="/10Songs.svg" className="h-full" />
        <h1 className="align-middle h-fit text-themePurple">Songs</h1>
      </div>
      <div className="inline-flex gap-2">
        <h3 className="w-fit p-0.5 text-themePurple font-[Audiowide] text-[0.8rem] text-start">
          Create the perfect{" "}
          <span className="font-bold text-themeGreen">ten</span> song,{" "}
          <br /> <span className="font-bold text-themeGreen">forty</span>{" "}
          minute playlist
        </h3>
        <div className="flex flex-col justify-center text-themePurple">
          <h2 className="">Weekly Theme:</h2>
          <h2 className=" bg-[rgba(255,255,255,0.42)] text-black font-bold  border shadow-2xl border-green-600 px-2 rounded-2xl">
            {weeklyTheme} Songs
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
