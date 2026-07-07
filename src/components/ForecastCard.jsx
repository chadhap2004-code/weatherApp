function ForecastCard({ item, unit }) {
  const temp = unit === 'C'
    ? Math.round(item.main.temp)
    : Math.round(item.main.temp * 9/5 + 32);

  const date = new Date(item.dt_txt);
  const day  = date.toLocaleDateString('en-US', { weekday: 'short' });
  const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

  return (
    <div className="forecast-card">
      <p className="forecast-day">{day}</p>
      <img src={icon} alt={item.weather[0].description} className="forecast-icon" />
      <p className="forecast-temp">{temp}°{unit}</p>
      <p className="forecast-desc">{item.weather[0].main}</p>
    </div>
  );
}

export default ForecastCard;