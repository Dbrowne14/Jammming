import Track from './Track.jsx';


export default function TrackList({tracks=[], showButton, addTrack, removeTrack, listType}) {
    return(
        <div>
            {tracks.map(track=> (
                <Track 
                key={`${listType}--${track.id}`}
                {...track}
                //id={track.id}
                //trackName={track.name}
                //trackArtist={track.artists[0].name}
                //trackArtist={track.artists.map(a=>a.name).join(" , ")}
                showButton={showButton}
                addTrack={addTrack}
                removeTrack={removeTrack}
                //uri={track.uri}
                />
            ))}
        </div>
    )
}