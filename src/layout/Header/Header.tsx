

const Header = () => {
  return (
    <header className="flex flex-col gap-2 justify-center items-center my-5">
      <div className="inline-flex gap-2 h-14 items-center">
        <img src="/10Songs.svg" className="h-full" />
        <h1 className="align-middle h-fit text-themePurple">Songs</h1>
      </div>
      <div className="inline-flex gap-2">
        <h3 className="w-fit p-0.5 text-themePurple font-[Audiowide] text-[0.8rem] text-center">
          Create the perfect{" "}
          <span className="font-bold text-green-500">ten</span> song,{" "}
          <br /> <span className="font-bold text-green-500">forty</span>{" "}
          minute playlist
        </h3>
       
      </div>
    </header>
  );
};

export default Header;
