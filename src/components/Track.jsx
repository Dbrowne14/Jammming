import styles from '../styles/SearchResults.module.css'

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
        <div className={styles.allResults}>
            <div className={styles.individualResults}>
                <div className={styles.trackDisplay}>
                    <h3 className={styles.text}>{trackName}</h3>
                    <p className={styles.text}>{trackArtist}</p>
                </div>
                {showButton && <button  onClick={handleAdd} className={styles.button}>+</button>}
                {!showButton && <button onClick={handleRemove} className={styles.button}>-</button>}
            </div>
        </div>
    )
}