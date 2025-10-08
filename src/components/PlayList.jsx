import { useState } from 'react';
import TrackList from './TrackList.jsx'
import styles from '../styles/playlist.module.css'

export default function PlayList ({savePlaylist, playListTracks, setPlayListTracks, removeTrack}) {
    
   //handle playlist name
   const [playListName, setPlayListName] = useState("")
   const [popUp, setPopUp] = useState(false)
   const [emptyPopUp, setEmptyPopUp] =useState(false)

    function handleNameChange(e) {
        setPlayListName(e.target.value);
    }

    function handleSubmit() {
            /*if no tracks or entry*/
            if(!playListTracks || playListTracks.length === 0) {
                setEmptyPopUp(true);
                setTimeout(()=> setEmptyPopUp(false),1000);
                return;
            }
            
            savePlaylist(playListName, playListTracks);
            setPlayListName("");
            setPlayListTracks([]);
            setPopUp(true);
            setTimeout (() => setPopUp(false), 1000)
            console.log(playListName)
    } 

    
    return(
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
                <button type="button" onClick={handleSubmit}>Save</button>

                {emptyPopUp && (
                    <div className={styles.overlay}> 
                        <div className={styles.popUp}>
                            <p>You must add tracks</p>
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
            <TrackList tracks={playListTracks} showButton={false} listType="playList" removeTrack={removeTrack}/>
            
        </div>
    )

}