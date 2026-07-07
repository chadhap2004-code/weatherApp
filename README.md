# Weather App ⛅

A real-time weather application built with React and Axios, showing current
conditions and a 5-day forecast for any city in the world.

**Live Demo:** [Add your Vercel link here]


---



## Features

- Search any city worldwide for real-time weather data
- Current conditions — temperature, feels like, humidity, wind speed, visibility, pressure, cloud cover
- 5-day forecast with weather icon per day
- Toggle between Celsius and Fahrenheit without re-fetching
- Recent searches saved to localStorage — click to re-search instantly
- Animated loading spinner while fetching
- Descriptive error messages — city not found, network error, timeout
- Retry button on error state
- Custom Axios instance with base URL, timeout, and interceptors
- All API logic isolated in a custom `useWeather` hook — zero fetch code in components

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Axios | HTTP client — replaces fetch |
| OpenWeatherMap API | Weather data source |
| Vite | Build tool and dev server |
| CSS | Styling — no external UI library |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- Free OpenWeatherMap API key (instructions below)

### Get your free API key

1. Go to [openweathermap.org](https://openweathermap.org)
2. Click **Sign Up** → create a free account
3. Go to **API Keys** tab in your dashboard
4. Copy your default API key
5. Note: new keys take ~10 minutes to activate

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weather-app.git

# Navigate into the project
cd weather-app

# Install dependencies
npm install axios

# Create environment file
echo "VITE_WEATHER_API_KEY=your_api_key_here" > .env

# Start the development server
npm run dev
```




---

## Project Structure

```
src/
├── api/
│   └── axiosInstance.js
├── hooks/
│   └── useWeather.js
├── components/
│   ├── SearchBar.jsx
│   ├── WeatherCard.jsx
│   ├── ForecastCard.jsx
│   ├── RecentSearches.jsx
│   └── ErrorMessage.jsx
└── App.jsx
```


---

## Architecture

```
App.jsx
├── useWeather hook
├── SearchBar
├── RecentSearches
├── WeatherCard
│   └── unit toggle (C/F)
├── ForecastCard × 5
└── ErrorMessage

```
## Error Handling

| Error | Cause | Message shown |
|---|---|---|
| 404 | City name not found | "City not found. Please check the spelling." |
| 401 | Invalid API key | "Invalid API key." |
| Timeout | Slow connection | "Request timed out. Check your connection." |
| No response | Network down | "Network error. Check your connection." |

---

## What I Learned

- Setting up an Axios instance with base URL, timeout, and interceptors
- Using interceptors to handle all API errors in one place globally
- Building a custom `useWeather` hook to isolate all fetch logic from components
- Filtering forecast data (3-hourly) down to one reading per day
- Storing data in base units and converting at render time instead of re-fetching
- Persisting and deduplicating recent searches in localStorage
- Protecting API keys using Vite environment variables

---

## Author

**Palak Chadha**
Computer Engineering · Thapar University · Batch 2027
