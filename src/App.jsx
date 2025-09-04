import { useState, useEffect } from 'react'
import SearchBar from './SearchBar.jsx'
import SearchResults from './SearchResults.jsx'
import PlayList from './PlayList.jsx'
import Spotify from './Spotify.js'
import './App.css'

function App() {
   const[searchResults, setSearchResults] = useState([
      { id: 1, trackName: "Song A", trackArtist: "Artist X" , uri:"spotify:track:4VHTOWCMRnKAgg4a9AKdwQ" },
      { id: 2, trackName: "Song B", trackArtist: "Artist Y", uri:"spotify:track:40BHuTz4IuRoHFLCH8oFNM"},
   ]);
   const [playListTracks,setPlayListTracks] = useState([])

   function addTrack(track) {
      if(!playListTracks.find(t=>t.id === track.id)) {
         setPlayListTracks([...playListTracks, track])
      }
   }

   function removeTrack(track) {
      setPlayListTracks(playListTracks.filter( t => t.id !== track.id))
   }

   const [playListName, setPlayListName] = useState("")

   function savePlaylist () {
      const saveURIs = playListTracks.map(track => track.uri);
}
 window.savePlaylist = savePlaylist

return(
   <>
      <SearchBar fetchApi={Spotify.searchForResults}/>
      <SearchResults tracks={searchResults} addTrack={addTrack}/>
      <PlayList playListTracks={playListTracks} removeTrack={removeTrack}/>
   </> 
  )
}

export default App
