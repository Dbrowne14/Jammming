import Track from './Track.jsx';


export default function TrackList({tracks=[], showButton, addTrack, removeTrack, listType}) {
    return(
        <div>
            {tracks.map(track=> (
                <Track 
                key={`${listType}--${track.id}`}
                {...track}
                showButton={showButton}
                addTrack={addTrack}
                removeTrack={removeTrack}
                />
            ))}
        </div>
    )
}