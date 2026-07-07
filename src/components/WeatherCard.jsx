function WeatherCard({weather , unit , onToggleUnit}){
    const temp = unit  === 'C' ? Math.round(weather.main.temp) : 
    Math.round(weather.main.temp * 9/5 + 32);
    
    const feelsLike = unit === 'C' ? 
    Math.round(weather.main.feels_like) : 
    Math.round(weather.main.feels_like * 9/5 +32);

    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    const details = [
            {label: 'Humidity' ,   value: `${weather.main.humidity}%`},
            {label: 'Wind' ,       value:  `${Math.round(weather.wind.speed)}m/s` },
            {label: 'Feels like' , value: `${feelsLike}°${unit}`},
            {label: 'Visibility' , value: `${(weather.visibility / 1000).toFixed(1)} Km`},
            {label: 'Pressure' ,   value: `${weather.main.pressure}hPa`},
            {label: 'Clouds' ,     value: `${weather.clouds.all}%`},
    ];

    return(
        <div className="weather-card">
            <div className="weather-top">
                <div className="city-info">
                    <h2 className="city-name">
                        {weather.name} , {weather.sys.country}
                    </h2>
                    <p className="condition">{weather.weather[0].description}</p>
                </div>
                <button className="unit-toggle" onClick={onToggleUnit}>
                    {unit === 'C' ? 'F' : 'C'}
                </button>
            </div>

            <div className="details-grid">
                {details.map(({label , value}) => (
                    <div key={label} className="detail-item">
                        <span className="detail-label">{label}</span>
                        <span className="detail-value">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default WeatherCard;