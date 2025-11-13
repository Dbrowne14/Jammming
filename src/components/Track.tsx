import styles from '../styles/SearchResults.module.css'

export interface Trackprops extends AddRemoveProps {
    showButton: boolean
    addTrack?: (param:AddRemoveProps) => void
    removeTrack?: (param:AddRemoveProps) => void
}

export interface AddRemoveProps {
    id: string
    trackName: string 
    trackArtist: string
    length: number
    uri: string  
}


export default function Track({id, trackName, trackArtist, length, showButton, addTrack, removeTrack, uri}: Trackprops) {

    function handleAdd() {
        if(addTrack) {  
            addTrack({id,trackName,trackArtist, uri, length})
            console.log("I am being clicked")
        }
    }

    function handleRemove() {
        if(removeTrack) {
            removeTrack({id,trackName, trackArtist, uri, length})
        }
    }

    return(
        <div className={styles.allResults}>
            <div className={styles.individualResults}>
                <div className={styles.trackDisplay}>
                    <h3 className={styles.text}>{trackName}</h3>
                    <p className={styles.text}>{trackArtist}</p>
                </div>
                 <div className={styles.lengthBox}>
                    <p className={styles.trackLength}>{length}</p>
                </div>
                <div className={styles.buttons}>
                    {showButton && <button  onClick={handleAdd} className={styles.button}>+</button>}
                    {!showButton && <button onClick={handleRemove} className={styles.button}>-</button>}
                </div>
            </div>
        </div>
    )
}

