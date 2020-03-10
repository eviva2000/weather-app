import React, { Component } from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./components/Weather";
import Form from "./components/Form";
import "./sass/app.scss";
const URL_Base = "https://api.openweathermap.org/data/2.5/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      temp: undefined,
      temp_max: undefined,
      temp_min: undefined,
      icon_id: undefined,
      description: "",
      feels_like: undefined,
      error: false,
      forecastData: []
    };
  }
  async componentDidMount() {
    const api_call = await fetch(
      `${URL_Base}weather?q=copenhagen&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    );

    const response = await api_call.json();
    console.log(response);
    this.setState({
      city: `${response.name},${response.sys.country}`,
      temp: response.main.temp,
      temp_max: response.main.temp_max,
      temp_min: response.main.temp_min,
      feels_like: response.main.feels_like,
      description: response.weather[0].description,
      icon_id: response.weather[0].id
    });
    this.getWeatherForecast("copenhagen");
  }
  // CURRENT WEATHER//
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city) {
      const api_call = await fetch(
        `${URL_Base}weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );

      const response = await api_call.json();
      console.log(response);
      this.setState({
        city: `${response.name},${response.sys.country}`,
        temp: response.main.temp,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_min,
        feels_like: response.main.feels_like,
        description: response.weather[0].description,
        icon_id: response.weather[0].id
      });
    } else {
      this.setState({
        error: true
      });
    }
    this.getWeatherForecast(city);
  };

  // FORECAST WEATHER//
  getWeatherForecast = async city => {
    const api_call = await fetch(
      `${URL_Base}forecast?q=${city}&units=metric&cnt=40&APPID=${process.env.REACT_APP_API_KEY}`
    );

    const response = await api_call.json();
    const dailyData = response.list.filter(reading =>
      reading.dt_txt.includes("6:00:00")
    );
    this.setState({
      forecastData: dailyData
    });
  };

  render() {
    return (
      <div className="App">
        <div className="form-container">
          <h3>My weather app</h3>
          <Form
            id="current-weater"
            loadWeather={this.getWeather}
            error={this.state.error}
          />
        </div>
        <div className="weather-forecast-container">
          <Weather
            city={this.state.city}
            temp={this.state.temp}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            icon_id={this.state.icon_id}
            feels_like={this.state.feels_like}
            forecastInfo={this.state.forecastData}
          />
        </div>
      </div>
    );
  }
}

export default App;

// eslint-disable-next-line
