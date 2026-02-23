import TrackList from "../../components/Fetched_Components/TrackList";
import { useSpotify } from "../../context/SpotfyContext";
import { fetchParams } from "../../data/fetchParameters";

export default function SearchResults() {
  const { searchResults, setSearchLimit } = useSpotify();
  return (
    <div>
      <div className="header-box items-center justify-center inline-flex gap-4 w-full">
        <h2 className="font-[Audiowide] text-[rgb(203,151,203)] text-center">
          Search Results:
        </h2>
        <select
          name="searchLimits"
          className="text-[whiteSmoke] "
          onChange={(e) => {
            setSearchLimit(Number(e.target.value));
          }}
        >
          {fetchParams.map((value, index) => {
            return <option key={index}>{value}</option>;
          })}
        </select>
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
