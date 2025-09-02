export default function Track({id, trackName, trackArtist, showButton, addTrack, removeTrack, uri}) {

    function handleAdd() {
        if(addTrack) {  
            addTrack({id,trackName,trackArtist, uri})
        }
    }

    function handleRemove() {
        if(removeTrack) {
            removeTrack({id,trackName, trackArtist, uri})
        }
    }

    return(
        <>
            <p>{trackName}-{trackArtist}</p>
            {showButton && <button  onClick={handleAdd}>+</button>}
            {!showButton && <button onClick={handleRemove}>-</button>}
        </>
    )
}