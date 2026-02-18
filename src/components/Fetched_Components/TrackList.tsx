import type { TrackListProps } from "../../types/types";
import Track from "./Track";

export default function TrackList({
  tracks = [],
  showButton,
  listType,
}: TrackListProps) {
  return (
    <div>
      {tracks.map((track) => (
        <Track
          key={`${listType}--${track.id}`}
          {...track}
          showButton={showButton}
        />
      ))}
    </div>
  );
}
