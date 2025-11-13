import { useState } from 'react';
import styles from '../styles/SearchBar.module.css'

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
            <h2 className={styles.header}>Search for your song</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                    name="search"
                    id="idInput"
                    placeholder="Search on Spotify"
                    type="text"
                    onChange={handleInput}
                    value={input}
                    className={styles.input}
                />
                <button type="submit" >Search</button> 
             </form>  
        </>
    )
}