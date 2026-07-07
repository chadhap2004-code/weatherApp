function RecentSearches({searches , onSelect , onClear}){
    if(searches.length === 0) return null;

    return(
        <div className="recent-section">
            <div className="recent-header">
                <p className="recent-title">Recent Searches</p>
                <button className="recent-clear" onClick={onClear}>Clear</button>
            </div>
            <div className="recent-list">
                {searches.map(city => (
                    <button 
                    key = {city}
                    className="recent-chip"
                    onClick={() => onSelect(city)}>
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RecentSearches;