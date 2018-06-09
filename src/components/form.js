import React from "react";

const Form = ({getWeather}) => (
    <form onSubmit={getWeather}>
        <input type="text" name="city" placeholder="City"></input>
        <input type="text" name="country" placeholder="Country"></input>
        <button>Get weather</button>
    </form>
);

export default Form;