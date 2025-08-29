import {useState} from 'react';
import TrackList from './TrackList.jsx'

export default function PlayList () {

    const playListTracks = [
        { id: 1, trackName: "Song X", trackArtist: "Artist A" },
        { id: 2, trackName: "Song Y", trackArtist: "Artist B" },
    ]
    
//change Playlist name to an input field
    return(
        <>
            <h2>Playlist name</h2>
            <TrackList tracks={playListTracks}/>
            <button type="submit">Save to Spotify</button>
        </>
    )

}