import { useState, type ChangeEvent } from "react";
import TrackList, { type TrackListProps } from "./TrackList.js";
import styles from "../styles/playlist.module.css";

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
      <div className={styles.main}>
        <input
          value={playListName}
          onChange={handleNameChange}
          placeholder="Enter New Playlist"
          type="text"
          name="newplaylist"
          id="newplaylist"
          className={styles.input}
        />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>

        {emptyPopUp && (
          <div className={styles.overlay}>
            <div className={styles.popUp}>
              <p>You must have exactly 10 tracks</p>
            </div>
          </div>
        )}

        {popUp && (
          <div className={styles.overlay}>
            <div className={styles.popUp}>
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
