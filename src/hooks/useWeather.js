import { useState, useCallback } from 'react';
import api from '../api/axiosInstance';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function useWeather() {
  const [weather,  setWeather]  = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError('');
      setWeather(null);
      setForecast([]);

      // current weather
      const { data: current } = await api.get('/weather', {
        params: { q: city, appid: API_KEY, units: 'metric' },
      });

      // 5-day forecast
      const { data: forecastData } = await api.get('/forecast', {
        params: { q: city, appid: API_KEY, units: 'metric' },
      });

      setWeather(current);

      // forecast returns data every 3 hours — pick one per day (noon)
      const daily = forecastData.list.filter(item =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(daily.slice(0, 5));

    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, forecast, loading, error, fetchWeather };
}

export default useWeather;