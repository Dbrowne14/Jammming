import TrackList from "../../components/FetchedComponents/TrackList.js";
import { minutesToSeconds } from "../../utils/utilityFns.js";
import { useSpotify } from "../../context/SpotfyContext.js";

export default function PlayList() {
  const { playListTracks, totalPlaylistLength } = useSpotify();
  const playListlength = minutesToSeconds(totalPlaylistLength);
  return (
    <div>
      <div className="header-box inline-flex gap-4 items-center justify-center w-full">
        <h2 className="font-[Audiowide] text-[rgb(203,151,203)]">
          Playlist Length:{" "}
          <span className="text-[whitesmoke]">
            {totalPlaylistLength === 0 ? "---" : playListlength}
          </span>{" "}
        </h2>
        <h2 className="font-[Audiowide] text-[rgb(203,151,203)]">
          Count:{" "}
          <span className="text-[whitesmoke]">
            {playListTracks.length === 0 ? "---" : playListTracks.length}
          </span>{" "}
        </h2>
      </div>
      <TrackList
        tracks={playListTracks}
        showButton={false}
        listType="playList"
      />
    </div>
  );
}
