import React from "react";

const Weather = ({city, country, temperature, humidity, description, info}) => {
    return (
        <div>
            { city && country && <p>Location: {city}, {country}</p> }
            { temperature && <p>Temperature: {temperature}</p> }
            { humidity && <p>Humidity: {humidity}</p> }
            { description && <p>Condition: {description}</p> }
            { info && <p>{info}</p> }
         </div>
    )
};

export default Weather;