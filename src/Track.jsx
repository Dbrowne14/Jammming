//import React, { useState } from 'react';

export default function Track({trackName, trackArtist}) {
    return(
        <>
            <p>{trackName}-{trackArtist}</p>
            <button>Add Track</button>
        </>
    )
}