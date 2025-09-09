import {useState} from 'react';
import TrackList from './TrackList.jsx'

export default function PlayList ({playListTracks, removeTrack, playListName, setPlayListName}) {
    
    function handleNameChange(e) {
        setPlayListName(e.target.value)
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
            <button type="submit">Save to Spotify</button>
        </>
    )

}