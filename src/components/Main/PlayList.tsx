import TrackList from "../Fetched_Components/TrackList.js";

import { useSpotify } from "../../context/SpotfyContext.js";

export default function PlayList() {

  const { playListTracks } = useSpotify();
  return (
    <div>
      <div className="header-box inline-flex gap-2 items-center justify-center w-full">
        <h2 className="font-[Audiowide] text-[rgb(144,90,144)]">Playlist</h2>
      </div>
      <TrackList
        tracks={playListTracks}
        showButton={false}
        listType="playList"
      />
    </div>
  );
}
