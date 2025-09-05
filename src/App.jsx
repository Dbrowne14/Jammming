import { useState, useEffect } from 'react'
import SearchBar from './SearchBar.jsx'
import SearchResults from './SearchResults.jsx'
import PlayList from './PlayList.jsx'
import Spotify from './utils/Spotify.js'
import './App.css'

function App() {
   const[searchResults, setSearchResults] = useState([]);
   const[playListTracks,setPlayListTracks] = useState([]);


   useEffect(()=> {
      const initAuth = async () => {
         const code = Spotify.getResponse();
         const cachedToken = localStorage.getItem("access_token");

         
         if(cachedToken) {
            console.log("Using Existing Token");
            return;
         }

         if(code) {
            console.log("Access Token retrieved and saved")
            return;
         }

         Spotify.getAuthUrl();
         console.log(Spotify.getAuthUrl())
         }; initAuth();
      }, [])

   function addTrack(track) {
      if(!playListTracks.find(t=>t.id === track.id)) {
         setPlayListTracks([...playListTracks, track])
      }
   }

   function removeTrack(track) {
      setPlayListTracks(playListTracks.filter( t => t.id !== track.id))
   }

   async function handleSearch(searchValue) {   
      const results = await Spotify.searchForResults(searchValue);
      setSearchResults(results);
   }

   const [playListName, setPlayListName] = useState("")

   function savePlaylist () {
      const saveURIs = playListTracks.map(track => track.uri);
   }
   window.savePlaylist = savePlaylist

   return(
   <>
      <SearchBar onSearch={handleSearch}/>
      <SearchResults tracks={searchResults} addTrack={addTrack}/>
      <PlayList playListTracks={playListTracks} removeTrack={removeTrack}/>
   </> 
  )
}

export default App
