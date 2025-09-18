import {useState} from 'react';
import TrackList from './TrackList.jsx'

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
        <>
            <input 
                value={playListName} 
                onChange={handleNameChange} 
                placeholder="Enter New Playlist" 
                type="text" 
                name="newplaylist" 
                id="newplaylist" 
            />
            <TrackList tracks={playListTracks} showButton={false} listType="playList" removeTrack={removeTrack}/>
            <button type="button" onClick={handleSubmit}>Save to Spotify</button>
        </>
    )

}