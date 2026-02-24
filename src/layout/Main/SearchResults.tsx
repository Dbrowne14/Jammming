import TrackList from "../../components/FetchedComponents/TrackList";
import { useSpotify } from "../../context/SpotfyContext";
import ListComponent from "../../components/ui/listComponent";

export default function SearchResults() {
  const { searchResults } = useSpotify();
  return (
    <div>
      <div className="header-box items-center justify-center inline-flex gap-4 w-full">
        <h2 className="font-[Audiowide] text-[rgb(203,151,203)] text-center">
          Search Results:
        </h2>
        <ListComponent />
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
