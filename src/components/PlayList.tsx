import { useState, type ChangeEvent } from "react";
import TrackList, { type TrackListProps } from "./TrackList.js";

type PlayListProps = Pick<TrackListProps, "removeTrack"> & {
  savePlaylist: (playListName: string, playListTracks: TrackListProps["tracks"]) => void
  playListTracks: TrackListProps["tracks"];
  setPlayListTracks: (playListTracks: TrackListProps["tracks"]) => void;
};

export default function PlayList({
  savePlaylist,
  playListTracks,
  setPlayListTracks,
  removeTrack,
}: PlayListProps) {
  //handle playlist name
  const [playListName, setPlayListName] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [emptyPopUp, setEmptyPopUp] = useState(false);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setPlayListName(e.target.value);
  }

  function handleSubmit() {
    /*if no tracks or entry*/
    if (!playListTracks || playListTracks.length !== 10) {
      setEmptyPopUp(true);
      setTimeout(() => setEmptyPopUp(false), 1000);
      return;
    }

    savePlaylist(playListName, playListTracks);
    setPlayListName("");
    setPlayListTracks([]);
    setPopUp(true);
    setTimeout(() => setPopUp(false), 1000);
    console.log(playListName);
  }

  return (
    <div>
      <div className="header-box inline-flex gap-2 items-center justify-center px-2 w-full">
        <input
          value={playListName}
          onChange={handleNameChange}
          placeholder="Enter New Playlist"
          type="text"
          name="newplaylist"
          id="newplaylist"
          className="w-40"
        />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>

        {emptyPopUp && (
          <div className="overlay">
            <div className="popUp">
              <p>You must have exactly 10 tracks</p>
            </div>
          </div>
        )}

        {popUp && (
          <div className="overlay">
            <div className="popUp">
              <p>Succesfully Saved to Spotify</p>
            </div>
          </div>
        )}
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
