import Track from './Track.jsx';


export default function TrackList({tracks, showButton, addTrack, removeTrack, listType}) {
    return(
        <div>
            {tracks.map(track=> (
                <Track 
                key={`${listType}--${track.id}`}
                id={track.id}
                trackName={track.trackName}
                trackArtist={track.trackArtist}
                showButton={showButton}
                addTrack={addTrack}
                removeTrack={removeTrack}
                uri={track.uri}
                />
            ))}
        </div>
    )
}