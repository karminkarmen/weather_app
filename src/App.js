import React from 'react';
import {geolocated} from 'react-geolocated';
import Titles from './components/titles.js';
import Form from './components/form.js';
import Weather from './components/weather.js';
import WeatherIcon from './components/weathericon.js';
import ColorConfig from './color-config.json';
import 'semantic-ui/dist/semantic.min.css';

const API_KEY = '094494d1ce4e4d6d4c1d0a5f68ca29cc';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    info: undefined,
    bgColor: 'blue',
  };

  getDerivedStateFromProps (props) {
    console.log (props);
    this.getGeoWeather (props);
  }

  setColor = () => {
    const icon = this.state.icon;
    const temp = this.state.temperature;

    let color = this.getColorFromConfig (temp, icon);

    this.setState ({
      bgColor: color,
    });
  };

  getColorFromConfig = (temp, icon) => {
    for (let c of ColorConfig) {
      if (
        (c.temp.min === undefined || temp >= c.temp.min) &&
        (c.temp.max === undefined || temp < c.temp.max) &&
        (!c.icon.length || c.icon.includes (icon))
      ) {
        return c.color;
      }
    }
    return null;
  };

  getWeather = async e => {
    console.log (e);
    e.preventDefault ();
    const location = e.target.elements.location.value;
    console.log (location);
    if (!location) {
      this.setState ({
        info: 'Please input location',
      });
      return;
    }
    const api_call = await fetch (
      `//api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json ();
    if (!data.main) {
      this.setState ({
        info: 'Location not found',
      });
      return;
    }
    this.setState ({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      icon: data.weather[0].icon,
      description: data.weather[0].description,
      info: '',
    });
    this.setColor ();
  };

  getGeoWeather = async ({
    coords,
    isGeolocationEnabled,
    isGeolocationAvailable,
  }) => {
    const lat = coords.latitude;
    const lon = coords.longitude;

    if (!coords) {
      this.setState ({
        info: 'Wait',
      });
    }

    const geoloc_api_call = await fetch (
      `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await geoloc_api_call.json ();

    if (isGeolocationAvailable) {
      this.setState ({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        info: '',
      });
    } else if (!isGeolocationEnabled) {
      this.setState ({
        info: 'Geolocation is not enabled',
      });
    } else {
      this.setState ({
        info: 'Your browser does not support Geolocation',
      });
    }
    this.setColor ();
  };

  render () {
    console.log (this.props.coords);
    const css = {backgroundColor: this.state.bgColor};
    return (
      <div style={css} id="background-block">
        <div className="ui container">
          <Titles />
          <div className="ui one column doubling stackable grid container">
            <WeatherIcon icon={this.state.icon} />
            <Weather
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              icon={this.state.icon}
            />
          </div>
          <div className="ui one column doubling stackable grid container">
            <Form getWeather={this.getWeather} info={this.state.info} />
          </div>
        </div>
      </div>
    );
  }
}

export default geolocated ({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
}) (App);
