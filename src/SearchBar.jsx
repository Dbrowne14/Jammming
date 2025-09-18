import { useState } from 'react';

export default function SearchBar({onSearch}) {
    const[input, setInput] = useState("");

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(input)
        console.log(onSearch(input))
    }

    return(
        <>  
            <form onSubmit={handleSubmit}>
                <h2>Search for your song</h2>
                <input 
                    name="search"
                    id="idInput"
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