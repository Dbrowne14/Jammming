import { useReact } from 'react';
import Track from './Track.jsx';


export default function TrackList({tracks}) {
    return(
        <div>
            {tracks.map(track=> (
                <Track 
                key={track.id}
                trackName={track.trackName}
                trackArtist={track.trackArtist}
                />
            ))}
        </div>
    )
}