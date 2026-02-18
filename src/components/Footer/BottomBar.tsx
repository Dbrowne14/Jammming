import { useState, type ChangeEvent } from "react";
import { useSpotify } from "../../context/SpotfyContext";
import Spotify from "../../utils/Spotify";

const BottomBar = () => {
  //handle playlist name
  const [playListName, setPlayListName] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [emptyPopUp, setEmptyPopUp] = useState(false);
  const { playListTracks, setPlayListTracks } = useSpotify();
  const savePlayList = Spotify.savePlaylist.bind(Spotify);
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

    savePlayList(playListName, playListTracks);
    setPlayListName("");
    setPlayListTracks([]);
    setPopUp(true);
    setTimeout(() => setPopUp(false), 1000);
    console.log(playListName);
  }
  return (
    <footer className="w-full h-10 flex items-center">
      <div className="inline-flex justify-between items-center h-[75%] w-full">
        <div className="flex-1 h-full max-w-2xl">
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
            {emptyPopUp && (
              <div className="overlay">
                <div className="popUp">
                  <p>Must have exactly 10 tracks</p>
                </div>
              </div>
            )}
            {popUp && (
              <div className="overlay">
                <div className="popUp">
                  <p>Successfully Saved to Spotify</p>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="inline-flex justify-center items-center w-fit h-full  gap-1 ">
          <h2 className="font-bold font-[Audiowide] text-[rgb(144,90,144)]">
            Score:
          </h2>
          <h2 className="font-bold font-[Audiowide] text-center rounded-2xl bg-[rgba(238,184,239,0.5)] px-2">
            99
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;
