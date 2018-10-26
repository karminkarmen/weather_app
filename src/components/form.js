import React from "react";

const Form = ({getWeather, info}) => (
    <div className="column">
        <form className="ui form" onSubmit={getWeather}>
            <div id="form-block">
            <div className="field">
                <label id="form-label">location</label>
                <div className="ui icon input">
                    <input type="text" name="location" placeholder="city and country"/>
                    <i class="search icon"></i>
                </div>
            </div>
                <button className="ui inverted standard button">Get weather</button>
            </div>
            <div id="submit-block">
                { info && <p>{info}</p> }
            </div>
        </form>
    </div>
);

export default Form;