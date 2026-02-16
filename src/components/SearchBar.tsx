import { useState } from 'react';

type SearchBar = {
    onSearch:(param:string) => void;
}

export default function SearchBar({onSearch}:SearchBar) {
    const[input, setInput] = useState("");

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch(input)
        console.log(onSearch(input))
    }

    return(
        <>  
            <h2 className="font-[Audiowide] text-[rgb(144,90,144)]">Search for your song</h2>
            <form onSubmit={handleSubmit} className="inline-flex gap-2 items-center mt-0.5 w-fit">
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