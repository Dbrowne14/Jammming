export default function Track({id, trackName, trackArtist, showButton, addTrack, removeTrack, uri}) {

    function handleAdd() {
        if(addTrack) {  
            addTrack({id,trackName,trackArtist, uri})
            console.log("Iam being clicked")
        }
    }

    function handleRemove() {
        if(removeTrack) {
            removeTrack({id,trackName, trackArtist, uri})
        }
    }

    return(
        <>
            <h3>{trackName}</h3>
            <p>{trackArtist}</p>
            {showButton && <button  onClick={handleAdd}>+</button>}
            {!showButton && <button onClick={handleRemove}>-</button>}
        </>
    )
}