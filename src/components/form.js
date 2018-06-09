import React from "react";

const Form = ({getWeather}) => (
    <div className="column">
        <form className="ui form" onSubmit={getWeather}>
            <div className="field">
                <label>City</label>
                <div className="ui icon input">
                    <input type="text" name="city" placeholder="City"></input>
                    <i class="search icon"></i>
                </div>
            </div>
            <div className="field">
                <label>Country</label>
                <div className="ui icon input">
                    <input type="text" name="country" placeholder="Country"></input>
                    <i class="search icon"></i>
                </div>
            </div>
            <button className="ui inverted blue button">Get weather</button>
        </form>
    </div>
);

export default Form;