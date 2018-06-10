import React from "react";

const Weather = ({city, country, temperature, humidity, description, icon}) => {
    return (
        <div className="column" id="api-info-column">
            <div id="city-country-title">
                { city && country && <h2>{city} {country}</h2> }
            </div>
            <div id="weather-info">
                { temperature && <div className="weather-info-elem"><img src="images/svg/thermometer.svg"/><p>{temperature}&#x2103;</p></div> }
                { humidity && <div className="weather-info-elem"><img src="images/svg/drop.svg"/><p>{humidity}%</p></div> }
                { description && <div className="weather-info-elem">
                    {(icon === "01d") && <img src="images/svg/sun-1.svg"/>}
                    {(icon === "01n") && <img src="images/svg/moon.svg"/>}
                    {(icon === "02d" || icon === "02n")  &&  <img src="images/svg/sun.svg"/>}
                    {(icon === "03d" || icon === "03n" ||icon === "04d" || icon === "04n")  && <img src="images/svg/clouds.svg"/>}
                    {(icon === "09d" || icon === "09n" ||icon === "10d" || icon === "10n") && <img src="images/svg/rain.svg"/>}
                    {(icon === "11d" || icon === "11n")  &&  <img src="images/svg/lightning-1.svg"/>}
                    {(icon === "13d" || icon === "13n")  &&  <img src="images/svg/snow-1.svg"/>}
                    {(icon === "50d" || icon === "50n")  &&  <img src="images/svg/waves.svg"/>}
                    <p>{description}</p></div> }
            </div>
         </div>
    )
};

export default Weather;