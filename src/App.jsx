import { useState, useEffect } from 'react'
import SearchBar from './SearchBar.jsx'
import SearchResults from './SearchResults.jsx'
import PlayList from './PlayList.jsx'
import Spotify from './utils/Spotify.js'
import './App.css'

function App() {
   const[searchResults, setSearchResults] = useState([]);
   const[playListTracks,setPlayListTracks] = useState([]);


   useEffect(() => {
      const initAuth = async () => {
         const token = await Spotify.getValidAccessToken();
         if (token) {
            console.log("Authenticated successfully");
         }
      };

      initAuth();
   },[]);


   function addTrack(track) {
      if(!playListTracks.find(t=>t.id === track.id)) {
         setPlayListTracks([...playListTracks, track])
         console.log(playListTracks)
      }
   }

   function removeTrack(track) {
      setPlayListTracks(playListTracks.filter( t => t.id !== track.id))
   }

   async function handleSearch(searchValue) {   
      const results = await Spotify.searchForResults(searchValue);

      const mappedResults = results.map(track => ({
        id: track.id,
        trackName: track.name,
        trackArtist: track.artists.map(a => a.name).join(", "),
        uri: track.uri
      }));

      setSearchResults(mappedResults);
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
      <PlayList playListTracks={playListTracks} removeTrack={removeTrack} playListName={playListName} setPlayListName={setPlayListName}/>
   </> 
  )
}

export default App
