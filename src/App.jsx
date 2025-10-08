import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar.jsx'
import SearchResults from './components/SearchResults.jsx'
import PlayList from './components/PlayList.jsx'
import Spotify from './utils/Spotify.js'
import styles from './styles/App.module.css'

function App() {

   //get token on render
   useEffect(() => {
      const initAuth = async () => {
         const token = await Spotify.getValidAccessToken();
         if (token) {
            console.log("Authenticated successfully");
         }
      };
      initAuth();
   },[]);

   //add tracks to playlist
   const[playListTracks,setPlayListTracks] = useState([]);
   function addTrack(track) {
      if(!playListTracks.find(t=>t.id === track.id)) {
         setPlayListTracks([...playListTracks, track])
         console.log(playListTracks)
      }
   }

   function removeTrack(track) {
      setPlayListTracks(playListTracks.filter(t => t.id !== track.id))
   }

   function minutesToSeconds(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds /60);
      const seconds = totalSeconds % 60;

      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
      
      return `${minutes}:${formattedSeconds}`
   }

   //handle search functions
   const[searchResults, setSearchResults] = useState([]);
   async function handleSearch(searchValue) {   
      const results = await Spotify.searchForResults(searchValue);
      console.log(results)
      const mappedResults = results.map(track => ({
        id: track.id,
        trackName: track.name,
        trackArtist: track.artists.map(a => a.name).join(", "),
        uri: track.uri,
        length: minutesToSeconds(track.duration_ms)
      }));

      setSearchResults(mappedResults);
   }
   


   return(
   <div className={styles.app}>
      <div className={styles.header}>
         <h1>IØ Songs</h1>
         <h3>Create the perfect ten song playlist</h3>
      </div>
      <div className={styles.heroBanner}>
         <SearchBar onSearch={handleSearch}/>
         <div className={styles.splitPanel}>
            <div className={styles.leftPanel}>
               <SearchResults tracks={searchResults} addTrack={addTrack}/>
            </div>
            <div className={styles.rightPanel}>
            <PlayList 
               playListTracks={playListTracks} 
               setPlayListTracks={setPlayListTracks} 
               removeTrack={removeTrack} 
               savePlaylist={Spotify.savePlaylist.bind(Spotify)}    
            />
            </div>
         </div>
      </div> 
   </div> 
  )
}

export default App
