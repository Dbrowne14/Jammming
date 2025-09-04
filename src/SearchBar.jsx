import { useState } from 'react';

export default function SearchBar({fetchApi}) {
    const[input, setInput] = useState("");

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchApi(input)
        console.log(fetchApi(input))
    }

    return(
        <>  
            <form onSubmit={handleSubmit}>
                <h1>Search for your song</h1>
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