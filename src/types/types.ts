export interface Trackprops extends Track {
  showButton: boolean;
  addTrack?: (param: Track) => void;
  removeTrack?: (param: Track) => void;
}

export interface Track {
  id: string;
  trackName: string;
  trackArtist: string;
  length: string;
  uri: string;
}

export type TrackListProps = Pick<
  Trackprops,
  "showButton" | "addTrack" | "removeTrack"
> & {
  tracks: Track[];
  listType: string;
};

export type PlayListProps = {
  savePlaylist: (
    playListName: string,
    playListTracks: TrackListProps["tracks"],
  ) => void;
  playListTracks: TrackListProps["tracks"];
  setPlayListTracks: (playListTracks: TrackListProps["tracks"]) => void;
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  duration_ms: number;
  uri: string;
};
