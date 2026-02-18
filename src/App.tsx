import { useEffect } from "react";
import Spotify from "./utils/Spotify.ts";
import BottomBar from "./components/Footer/BottomBar.tsx";
import Header from "./components/Header/Header.tsx";
import Main from "./components/Main/Main.tsx";

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
      <div className="flex flex-col max-w-6xl items-center gap-2 text-[rgb(33,8,36)] font-[monospace] min-h-screen w-full p-2">
        <Header />
        <Main />
        <BottomBar />
      </div>
    </div>
  );
}

export default App;
