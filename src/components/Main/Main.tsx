import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import PlayList from "./PlayList";

const Main = () => {
  return (
    <main className="flex-1 w-full flex flex-col gap-3 justify-center items-center">
      <SearchBar />
      <div className="w-full flex-1 grid grid-rows-[1fr_1fr] sm:grid-rows-none sm:grid-cols-[1fr_1fr] justify-items-stretch items-stretch gap-1  rounded-t-2xl overflow-y-auto">
        <div className="panel rounded-t-2xl">
          <SearchResults />
        </div>
        <div className="panel rounded-t-2xl">
          <PlayList />
        </div>
      </div>
    </main>
  );
};

export default Main;
