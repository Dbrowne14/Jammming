import TrackList, {type TrackListProps} from "./TrackList.js";


export default function SearchResults({ tracks, addTrack }: Pick <TrackListProps, "tracks" | "addTrack">) {
  return (
    <>
      <h2 className="font-[Audiowide] text-[rgb(144,90,144)] text-center">Search Results</h2>
      <TrackList
        tracks={tracks}
        showButton={true}
        addTrack={addTrack}
        listType="searchResults"
        removeTrack={undefined}
      />
    </>
  );
}
//text standardise between h2 and a few others like heading