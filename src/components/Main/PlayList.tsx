import TrackList from "../Fetched_Components/TrackList.js";
import type { TrackListProps } from "../../types/types.js";

type PlayListViewProps = Pick<TrackListProps, "removeTrack"> & {
  playListTracks: TrackListProps["tracks"];
};

export default function PlayList({
  playListTracks,
  removeTrack,
}: PlayListViewProps) {
  //handle playlist name

  return (
    <div>
      <div className="header-box inline-flex gap-2 items-center justify-center w-full">
        <h2 className="font-[Audiowide] text-[rgb(144,90,144)]">Playlist</h2>
      </div>
      <TrackList
        tracks={playListTracks}
        showButton={false}
        listType="playList"
        removeTrack={removeTrack}
        addTrack={undefined}
      />
    </div>
  );
}
