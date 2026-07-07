import { useState, useEffect } from "react";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import RecentSearches from "./components/RecentSearches";
import ErrorMessage from "./components/ErrorMessage";



const MAX_RECENT = 5;

function App() {
  const { weather, forecast, loading, error, fetchWeather } = useWeather();
  const [unit, setUnit]       = useState('C');
  const [recent, setRecent]   = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recent-searches')) || [];
    } catch {
      return [];
    }
  });
  const [lastCity, setLastCity] = useState('');

  // save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem('recent-searches', JSON.stringify(recent));
  }, [recent]);

  function handleSearch(city) {
    setLastCity(city);
    fetchWeather(city);

    // add to recent — no duplicates, max 5
    setRecent(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, MAX_RECENT);
    });
  }

  function handleToggleUnit() {
    setUnit(u => u === 'C' ? 'F' : 'C');
  }

  function handleClearRecent() {
    setRecent([]);
    localStorage.removeItem('recent-searches');
  }

  return (
    <div className="page">
      <div className="app">

        <header className="app-header">
          <h1 className="app-title">Weather App</h1>
          <p className="app-sub">Powered by OpenWeatherMap</p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        <RecentSearches
          searches={recent}
          onSelect={handleSearch}
          onClear={handleClearRecent}
        />

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Fetching weather...</p>
          </div>
        )}

        {error && !loading && (
          <ErrorMessage
            message={error}
            onRetry={() => lastCity && handleSearch(lastCity)}
          />
        )}

        {weather && !loading && !error && (
          <>
            <WeatherCard
              weather={weather}
              unit={unit}
              onToggleUnit={handleToggleUnit}
            />

            {forecast.length > 0 && (
              <div className="forecast-section">
                <h3 className="forecast-title">5-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.map(item => (
                    <ForecastCard
                      key={item.dt}
                      item={item}
                      unit={unit}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!weather && !loading && !error && (
          <div className="empty-state">
            <p className="empty-icon">🌤️</p>
            <p className="empty-title">Search a city to get started</p>
            <p className="empty-sub">Get real-time weather and 5-day forecast</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;