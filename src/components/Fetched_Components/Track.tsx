import type { Trackprops } from "../../types/types"
import { useSpotify } from "../../context/SpotfyContext"



export default function Track({id, trackName, trackArtist, length, lengthSeconds, showButton, uri}: Trackprops) {
    const {addTrack, removeTrack} = useSpotify()


    function handleAdd() {
        if(addTrack) {  
            addTrack({id,trackName,trackArtist, uri, length,lengthSeconds})
            console.log("I am being clicked")
        }
    }

    function handleRemove() {
        if(removeTrack) {
            removeTrack({id,trackName, trackArtist, uri, length,lengthSeconds})
        }
    }

    return(
        <div>
            <div className="flex flex-row gap-2 items-center justify-center border-b-[rgba(68,56,72,0.8)] border-b-[0.5px] px-1">
                <div className="flex-1 py-1">
                    <h3 className="text-[rgb(43,22,54)] font-semibold">{trackName}</h3>
                    <p className="text-[rgb(43,22,54)]">{trackArtist}</p>
                </div>
                 <div>
                    <p className="font-bold text-[rgb(42,4,42)] rounded-2xl p-[0.3rem] bg-[rgba(255,253,255,0.1)]">{length}</p>
                </div>
                <div>
                    {showButton && <button  onClick={handleAdd} className="h-6 w-6 font-bold rounded-2xl">+</button>}
                    {!showButton && <button onClick={handleRemove} className="h-6 w-6 font-bold">-</button>}
                </div>
            </div>
        </div>
    )
}

