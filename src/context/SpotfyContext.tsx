import { createContext, useState, useContext } from "react";
import Spotify from "../utils/Spotify";
import type { SpotifyTrack, Track } from "../types/types";
import { minutesToSeconds } from "../utils/utilityFns";

type SpotifyContextType = {
  playListTracks: Track[];
  addTrack: (track: Track) => void;
  removeTrack: (track: Track) => void;
  setPlayListTracks: React.Dispatch<React.SetStateAction<Track[]>>;
  searchResults: Track[];
  handleSearch: (searchValue: string) => Promise<void>;
  totalPlaylistLength: number;
  totalPlayListTrackLength: number;
};

const SpotifyContext = createContext<SpotifyContextType | null>(null);

export function useSpotify() {
  const context = useContext(SpotifyContext);
  if (!context)
    throw new Error("useSpotify must be used inside SpotifyProvider");
  return context;
}

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [playListTracks, setPlayListTracks] = useState<Track[]>([]);
  const [searchResults, setSearchResults] = useState<Track[]>([]);

  function addTrack(track: Track) {
    if (!playListTracks.find((t) => t.id === track.id)) {
      setPlayListTracks([...playListTracks, track]);
    }
  }

  function removeTrack(track: Track) {
    setPlayListTracks(playListTracks.filter((t) => t.id !== track.id));
  }

  async function handleSearch(searchValue: string) {
    const results: SpotifyTrack[] = await Spotify.searchForResults(searchValue);
    console.log(results);
    const mappedResults: Track[] = results.map((track) => ({
      id: track.id,
      trackName: track.name,
      trackArtist: track.artists.map((a) => a.name).join(", "),
      length: minutesToSeconds(track.duration_ms),
      lengthSeconds: track.duration_ms,
      uri: track.uri,
    }));

    setSearchResults(mappedResults);
  }

  const totalPlayListTrackLength = playListTracks.length

  const totalPlaylistLength = playListTracks.reduce(
    (sum, track) => sum + track.lengthSeconds,
    0,
  );

  return (
    <SpotifyContext.Provider
      value={{
        playListTracks,
        setPlayListTracks,
        addTrack,
        removeTrack,
        searchResults,
        handleSearch,
        totalPlaylistLength,
        totalPlayListTrackLength
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
