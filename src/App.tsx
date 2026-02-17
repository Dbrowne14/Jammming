import { useState, useEffect } from "react";
import SearchBar from "./components/Main/SearchBar.tsx";
import SearchResults from "./components/Main/SearchResults.tsx";
import PlayList from "./components/Main/PlayList.tsx";
import Spotify from "./utils/Spotify.ts";
import { type Track } from "./types/types.ts";
import BottomBar from "./components/BottomBar.tsx";
import Header from "./components/Header.tsx";

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

  //add tracks to playlist
  const [playListTracks, setPlayListTracks] = useState<Track[]>([]);
  function addTrack(track: Track) {
    if (!playListTracks.find((t) => t.id === track.id)) {
      setPlayListTracks([...playListTracks, track]);
    }
  }

  function removeTrack(track: Track) {
    setPlayListTracks(playListTracks.filter((t) => t.id !== track.id));
  }

  function minutesToSeconds(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  }

  type SpotifyTrack = {
    id: string;
    name: string;
    artists: { name: string }[];
    duration_ms: number;
    uri: string;
  };

  //handle search functions
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  async function handleSearch(searchValue: string) {
    const results: SpotifyTrack[] = await Spotify.searchForResults(searchValue);
    console.log(results);
    const mappedResults: Track[] = results.map((track) => ({
      id: track.id,
      trackName: track.name,
      trackArtist: track.artists.map((a) => a.name).join(", "),
      length: minutesToSeconds(track.duration_ms),
      uri: track.uri,
    }));

    setSearchResults(mappedResults);
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-6xl items-center gap-2 text-[rgb(33,8,36)] font-[monospace] h-screen w-full p-2">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <div className="w-full  flex-1 grid grid-rows-[1fr_1fr] sm:grid-rows-none sm:grid-cols-[1fr_1fr] justify-items-stretch items-stretch gap-1  rounded-t-2xl overflow-y-auto">
          <div className="panel rounded-t-2xl">
            <SearchResults tracks={searchResults} addTrack={addTrack} />
          </div>
          <div className="panel rounded-t-2xl">
            <PlayList
              removeTrack={removeTrack}
              playListTracks={playListTracks}
            />
          </div>
        </div>
        <BottomBar
          savePlaylist={Spotify.savePlaylist.bind(Spotify)}
          playListTracks={playListTracks}
          setPlayListTracks={setPlayListTracks}
        />
      </div>
    </div>
  );
}

export default App;
