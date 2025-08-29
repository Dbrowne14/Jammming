import { useState } from 'react';

export default function SearchBar() {
    const[input, setInput] = useState("");

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(`You have searched for ${input}`)
    }

    return(
        <>  
            <form onSubmit={handleSubmit}>
                <h1>Search for your song</h1>
                <input 
                    placeholder="Search on Spotify"
                    type="text"
                    onChange={handleInput}
                    value={input}
                />
                <button type="submit" >Search</button> 
             </form>  
        </>
    )
}