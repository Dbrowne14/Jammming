import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar.jsx'
import SearchResults from './components/SearchResults.jsx'
import PlayList from './components/PlayList.jsx'
import Spotify from './utils/Spotify.js'
import styles from './styles/App.css'

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

   //handle search functions
   const[searchResults, setSearchResults] = useState([]);
   async function handleSearch(searchValue) {   
      const results = await Spotify.searchForResults(searchValue);
      console.log(results)
      const mappedResults = results.map(track => ({
        id: track.id,
        trackName: track.name,
        trackArtist: track.artists.map(a => a.name).join(", "),
        uri: track.uri
      }));

      setSearchResults(mappedResults);
   }
   


   return(
   <div>
      <div class="title">
         <h1>DaveJams</h1>
      </div>
      <SearchBar onSearch={handleSearch}/>
      <SearchResults tracks={searchResults} addTrack={addTrack}/>
      <PlayList 
         playListTracks={playListTracks} 
         setPlayListTracks={setPlayListTracks} 
         removeTrack={removeTrack} 
         savePlaylist={Spotify.savePlaylist.bind(Spotify)}
      />
   </div> 
  )
}

export default App
