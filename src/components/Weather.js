import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forecast from "./Forecast";

import * as weatherIcons from "../icons";
import moment from "moment";

class Weather extends Component {
  render() {
    // console.log(this.props);
    const {
      city,
      temp,
      feels_like,
      description,
      icon_id,
      forecastInfo
    } = this.props;
    const prefix = "wi wi-";
    console.log(forecastInfo);

    // Dynamic date for weather
    let d = new Date();
    d = moment(d)
      .add("day")
      .format("dddd DD MMM, h:mm");
    return (
      <Router>
        <nav>
          <li>
            <Link to="/">Current weather</Link>{" "}
          </li>
          <li>
            <Link to="/forecast">5 days</Link>{" "}
          </li>
        </nav>

        <div className="weatherAndForecast-container">
          <div
            className={`weather-container ${
              // eslint-disable-next-line
              icon_id ? (icon_id == 800 ? "sunny" : "cloudy") : null
            }`}
          >
            <h1>{city}</h1>
            <p>{d}</p>
            {temp ? <h1>{Math.round(temp)}&deg;</h1> : null}
            {feels_like ? (
              <h2>Feels like: {Math.round(feels_like)}&deg;</h2>
            ) : null}

            <h1>
              <span
                className={
                  icon_id ? prefix + weatherIcons.default[icon_id].icon : null
                }
                style={{ fontSize: "40px", color: "#00BFA5" }}
              ></span>
            </h1>
            <h4>{description}</h4>
          </div>
          <Switch>
            <Route
              path="/forecast"
              component={props => {
                return <Forecast forecastInfo={forecastInfo} {...props} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Weather;
