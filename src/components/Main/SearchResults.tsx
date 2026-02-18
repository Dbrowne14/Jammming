import TrackList from "../Fetched_Components/TrackList";
import { useSpotify } from "../../context/SpotfyContext";


export default function SearchResults() {

  const {searchResults} = useSpotify()

  return (
    <div>
      <div className="header-box flex items-center justify-center">
        <h2 className="font-[Audiowide] text-[rgb(203,151,203)] text-center">Search Results</h2>
      </div>
      <TrackList
        tracks={searchResults}
        showButton={true}
        listType="searchResults"
      />
    </div>
  );
}
//text standardise between h2 and a few others like heading