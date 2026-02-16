import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.tsx";
import SearchResults from "./components/SearchResults.tsx";
import PlayList from "./components/PlayList.tsx";
import Spotify from "./utils/Spotify.ts";
import styles from "./styles/App.module.css";
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
      console.log(playListTracks);
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
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>|Ø Songs</h1>
        <h3 className={styles.subHeader}>
          Create the perfect <span className={styles.focus}>ten</span> song,{" "}
          <br /> <span className={styles.focus}>thirty five</span> minute
          playlist
        </h3>
      </div>
      <div className={styles.heroBanner}>
        <SearchBar onSearch={handleSearch} />
        <div className={styles.splitPanel}>
          <div className={styles.leftPanel}>
            <SearchResults tracks={searchResults} addTrack={addTrack} />
          </div>
          <div className={styles.rightPanel}>
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
