import Track from "./Track.js";
import { type Trackprops } from "./Track.js";

export type TrackListProps = Pick<Trackprops, "showButton" | "addTrack" | "removeTrack"> & {
    tracks: Pick<Trackprops, "uri" | "length" | "trackArtist" | "trackName" | "id" >[]
    listType: string
}

export default function TrackList({
  tracks = [],
  showButton,
  addTrack,
  removeTrack,
  listType,
}:TrackListProps) {
  return (
    <div>
      {tracks.map((track) => (
        <Track
          key={`${listType}--${track.id}`}
          {...track}
          showButton={showButton}
          addTrack={addTrack}
          removeTrack={removeTrack}
        />
      ))}
    </div>
  );
}
