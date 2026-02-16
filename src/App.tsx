import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.tsx";
import SearchResults from "./components/SearchResults.tsx";
import PlayList from "./components/PlayList.tsx";
import Spotify from "./utils/Spotify.ts";
import { type Track } from "./components/Track.tsx";


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
    id: string
    name: string
    artists: {name: string }[]
    duration_ms: number
    uri: string
  }

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
      uri: track.uri
    }));

    setSearchResults(mappedResults);
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-[rgb(33,8,36)] font-[monospace] mb-2">
        <h1>|Ø Songs</h1>
        <h3 className="w-fit p-0.5 text-[rgb(181,138,170)] font-[Audiowide]">
          Create the perfect <span className="font-bold text-[rgb(91,89,89)]">ten</span> song,{" "}
          <br /> <span className="font-bold text-[rgb(91,89,89)]">thirty five</span> minute
          playlist
        </h3>
      </div>
      <div className="w-[20rem]">
        <SearchBar onSearch={handleSearch} />
        <div className="mt-2 w-full grid grid-cols-[1fr_1fr] justify-items-stretch items-stretch gap-1">
          <div className="panel">
            <SearchResults tracks={searchResults} addTrack={addTrack} />
          </div>
          <div className="panel">
            <PlayList
              playListTracks={playListTracks}
              setPlayListTracks={setPlayListTracks}
              removeTrack={removeTrack}
              savePlaylist={Spotify.savePlaylist.bind(Spotify)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
