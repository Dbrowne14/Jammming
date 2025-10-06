import {useState} from 'react';
import TrackList from './TrackList.jsx'
import styles from '../styles/playlist.module.css'

export default function PlayList ({savePlaylist, playListTracks, setPlayListTracks, removeTrack}) {
    
   //handle playlist name
   const [playListName, setPlayListName] = useState("")

    function handleNameChange(e) {
        setPlayListName(e.target.value);
    }

    function handleSubmit() {
            savePlaylist(playListName, playListTracks);
            setPlayListName("");
            setPlayListTracks([]);
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
            </div>
            <TrackList tracks={playListTracks} showButton={false} listType="playList" removeTrack={removeTrack}/>
            
        </div>
    )

}