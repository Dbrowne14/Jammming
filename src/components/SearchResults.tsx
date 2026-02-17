import TrackList, {type TrackListProps} from "./TrackList.js";


export default function SearchResults({ tracks, addTrack }: Pick <TrackListProps, "tracks" | "addTrack">) {
  return (
    <div>
      <div className="header-box flex items-center justify-center">
        <h2 className="font-[Audiowide] text-[rgb(144,90,144)] text-center">Search Results</h2>
      </div>
      <TrackList
        tracks={tracks}
        showButton={true}
        addTrack={addTrack}
        listType="searchResults"
        removeTrack={undefined}
      />
    </div>
  );
}
//text standardise between h2 and a few others like heading