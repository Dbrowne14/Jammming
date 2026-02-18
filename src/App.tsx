import { useEffect } from "react";
import SearchBar from "./components/Main/SearchBar.tsx";
import SearchResults from "./components/Main/SearchResults.tsx";
import PlayList from "./components/Main/PlayList.tsx";
import Spotify from "./utils/Spotify.ts";
import BottomBar from "./components/Footer/BottomBar.tsx";
import Header from "./components/Header/Header.tsx";


function App() {
  //get token on render
  useEffect(() => {
    const initAuth = async () => {
      const token = await Spotify.getValidAccessToken();
      if (token) {
        console.log("Authenticated successfully");
      }
    };
    initAuth();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-6xl items-center gap-2 text-[rgb(33,8,36)] font-[monospace] h-screen w-full p-2">
        <Header />
        <main className="flex-1 w-full flex flex-col justify-center items-center">
          <SearchBar />
          <div className="w-full flex-1 grid grid-rows-[1fr_1fr] sm:grid-rows-none sm:grid-cols-[1fr_1fr] justify-items-stretch items-stretch gap-1  rounded-t-2xl overflow-y-auto">
            <div className="panel rounded-t-2xl">
              <SearchResults/>
            </div>
            <div className="panel rounded-t-2xl">
              <PlayList/>
            </div>
          </div>
        </main>
        <BottomBar/>
      </div>
    </div>
  );
}

export default App;
