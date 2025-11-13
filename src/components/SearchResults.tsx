import TrackList from "./TrackList.js";
import styles from "../styles/SearchResults.module.css";

export default function SearchResults({ tracks, addTrack }) {
  return (
    <>
      <h2 className={styles.header}>Search Results</h2>
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
