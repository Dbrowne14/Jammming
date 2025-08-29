import { useReact } from 'react';
import TrackList from './TrackList.jsx'

export default function SearchResults() {
    
    const tracks = [
        { id: 1, trackName: "Song A", trackArtist: "Artist X" },
        { id: 2, trackName: "Song B", trackArtist: "Artist Y" },
        { id: 3, trackName: "Song C", trackArtist: "Artist Z" },
    ]

    return(
        <>
            <h2>Search Results</h2>
            <TrackList tracks={tracks} />
        </>
    )
}

