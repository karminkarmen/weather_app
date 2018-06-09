import React from "react";
import {geolocated} from 'react-geolocated';
import Titles from "./components/titles.js";
import Form from "./components/form.js";
import Weather from "./components/weather.js";
import "semantic-ui/dist/semantic.min.css";

const API_KEY = '094494d1ce4e4d6d4c1d0a5f68ca29cc';

class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        info: undefined
    };

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);

        const data = await api_call.json();

        if (city && country) {
            console.log(data);
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description
            });
        } else {
            this.setState({
                info: "Please input city and country"
            })
        }
    };

    getGeoWeather = async () => {
        const {coords} = this.props;
        const lat = coords.latitude;
        const lon = coords.longitude;

        const geoloc_api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await geoloc_api_call.json();

        if (this.props.isGeolocationAvailable) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                info: ''
            });
        } else if (!this.props.isGeolocationEnabled) {
            this.setState({
                info: "Geolocation is not enabled"
            });
        } else {
            this.setState({
                info: "Your browser does not support Geolocation"
            });
        }
    };

    componentDidMount() {
        window.addEventListener('load', this.getGeoWeather);
    }

    render() {
       return (
           <div>
                <Titles />
                <Form getWeather={this.getWeather}/>
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    info={this.state.info}
                />

           </div>
       );
    }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 100,
})(App);