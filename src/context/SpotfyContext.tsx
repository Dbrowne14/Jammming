import { createContext, useState, useContext } from "react";
import Spotify from "../utils/Spotify";
import type { SpotifyTrack, Track } from "../types/types";
import { minutesToSeconds, showNotification } from "../utils/utilityFns";
import type { AlertType } from "../types/types";
import AlertComponent from "@/components/ui/alertComponent";

type SpotifyContextType = {
  playListTracks: Track[];
  addTrack: (track: Track) => void;
  removeTrack: (track: Track) => void;
  setPlayListTracks: React.Dispatch<React.SetStateAction<Track[]>>;
  searchResults: Track[];
  handleSearch: (searchValue: string) => Promise<void>;
  totalPlaylistLength: number;
  totalPlayListTrackLength: number;
  searchLimit: number;
  setSearchLimit: React.Dispatch<React.SetStateAction<number>>;
  notification: AlertType | null;
  setNotification: React.Dispatch<React.SetStateAction<AlertType | null>>
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
  const [searchLimit, setSearchLimit] = useState(10);
  const [notification, setNotification] = useState<AlertType | null>(null);

  function addTrack(track: Track) {
    if (playListTracks.length >= 10) {
      showNotification( "Playlist limit reached", "You are allowed a maximum of 10 tracks", setNotification);
      return;
    }
    if (!playListTracks.find((t) => t.id === track.id)) {
      setPlayListTracks([...playListTracks, track]);
    }
  }

  function removeTrack(track: Track) {
    setPlayListTracks(playListTracks.filter((t) => t.id !== track.id));
  }

  async function handleSearch(searchValue: string) {
    const results: SpotifyTrack[] = await Spotify.searchForResults(
      searchValue,
      searchLimit,
    );
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

  const totalPlayListTrackLength = playListTracks.length;

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
        totalPlayListTrackLength,
        searchLimit,
        setSearchLimit,
        notification,
        setNotification
      }}
    >
      {children}
      {notification && <AlertComponent title={notification?.title} description={notification?.description} />}
    </SpotifyContext.Provider>
  );
}
