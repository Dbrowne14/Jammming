import TrackList from './TrackList.jsx'

export default function SearchResults({tracks, addTrack, removeTrack}) {
    
    return(
        <>
            <h2>Search Results</h2>
            <TrackList tracks={tracks} showButton={true} addTrack={addTrack} listType="searchResults"/>
        </>
    )
}

