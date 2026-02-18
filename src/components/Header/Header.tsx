

const Header = () => {
  return (
    <header className="flex flex-col gap-2 justify-center items-center my-5">
      <h1>|0 Songs</h1>
      <div className="inline-flex gap-2">
        <h3 className="w-fit p-0.5 text-[rgb(181,138,170)] font-[Audiowide] text-[0.8rem] text-start">
          Create the perfect{" "}
          <span className="font-bold text-[rgb(91,89,89)]">ten</span> song,{" "}
          <br />{" "}
          <span className="font-bold text-[rgb(91,89,89)]">forty</span>{" "}
          minute playlist
        </h3>
        <div className="flex flex-col justify-center">
          <h2 className="">Todays Theme:</h2>
          <h2 className=" bg-[rgba(13,3,13,0.2)] px-2 rounded-2xl">
            David Bowie Songs
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
