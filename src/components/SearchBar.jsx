import { useState } from "react";

function SearchBar({onSearch , loading}){
        const [input , setInput] = useState('');

        function handleSubmit(e){
                e.preventDefault();
                if(!input.trim()) return;
                onSearch(input.trim());
        }

        return(
            <form className="search-form" onSubmit={handleSubmit}>
                    <input type="text"
                    className="search-input"
                    placeholder="search city.."
                    value = {input}
                    onChange={e => setInput(e.target.value)}
                    disabled = {loading}
                    />
                    <button className="search-btn" type="submit" disabled={loading}>
                        {loading ? '...' : '🔍'}
                    </button>
            </form>
        );
}

export default SearchBar;