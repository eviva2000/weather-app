import React, { Component } from "react";
import * as weatherIcons from "../icons";

class Forecast extends Component {
  convertTimestap = timestamp => {
    // Months array
    var months_arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    // Convert timestamp to milliseconds
    var date = new Date(timestamp * 1000);

    // Month
    var month = months_arr[date.getMonth()];

    // Day
    var day = date.getDate();

    // weekday
    var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    var weekday = days[date.getDay()];

    return (
      <div className="date-wrapper">
        {" "}
        <h4>{weekday}</h4> <p>{day + "-" + month}</p>
      </div>
    );
  };
  render() {
    // console.log(this.props.forecastInfo);

    const prefix = "wi wi-";
    const fResult = this.props.forecastInfo.map((item, index) => {
      const icon = prefix + weatherIcons.default[item.weather[0].id].icon;
      return (
        <div key={"forecast" + index} className="forecast-container">
          <div>{this.convertTimestap(item.dt)}</div>
          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {item.main.temp ? (
              <h1>{Math.round(item.main.temp)}&deg; </h1>
            ) : null}

            <span
              className={icon}
              style={{ fontSize: "24px", color: "#00BFA5" }}
            ></span>
          </div>
          <p id="description">{item.weather[0].description}</p>
          <h4>
            {item.main.temp_min ? (
              <span>Lo:{Math.round(item.main.temp_min)}&deg; C </span>
            ) : null}
            <span> </span>
            {item.main.temp_max ? (
              <span>Hi:{Math.round(item.main.temp_max)}&deg; C</span>
            ) : null}
          </h4>
        </div>
      );
    });
    return <div className="parent-container">{fResult}</div>;
  }
}

export default Forecast;
