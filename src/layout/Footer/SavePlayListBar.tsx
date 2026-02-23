import { useState, type ChangeEvent } from "react";
import { useSpotify } from "../../context/SpotfyContext";
import Spotify from "../../utils/Spotify";
import { showNotification } from "@/utils/utilityFns";

const SavePlayListBar = () => {
  //handle playlist name
  const [playListName, setPlayListName] = useState("");
  const { playListTracks, setPlayListTracks, setNotification } = useSpotify();
  const savePlayList = Spotify.savePlaylist.bind(Spotify);
  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setPlayListName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!playListName.trim()) {
      showNotification(
        "Missing Playlist Name",
        "Please enter a name for your playlist before saving.",
        setNotification,
      );
      return;
    }

    if (playListTracks.length !== 10) {
      showNotification(
        "Incompatible Track Length",
        "You must have exactly 10 tracks",
        setNotification,
      );
      return;
    }

    savePlayList(playListName, playListTracks);
    showNotification(
      "Playlist Saved",
      "Succesfully saved your playlist to Spotify",
      setNotification,
    );
    setPlayListName("");
    setPlayListTracks([]);
  }

  return (
    <div className="flex-1 h-8 max-w-2xl">
      <form
        onSubmit={handleSubmit} // handleSubmit will receive the event
        className="inline-flex gap-2 items-center justify-center h-full px-2 w-full"
      >
        <h2 className="text-center hidden sm:block font-[Audiowide] text-[rgb(144,90,144)]">
          Save Playlist:
        </h2>
        <input
          value={playListName}
          onChange={handleNameChange}
          placeholder="Playlist Name"
          type="text"
          name="newplaylist"
          id="newplaylist"
          className="h-full"
        />
        <button type="submit" className="h-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default SavePlayListBar;
