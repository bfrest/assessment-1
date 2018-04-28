import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";
import statesArr from "./statesArr";

class App extends Component {
  constructor() {
    super();

    this.state = {
      weather: [],
      selectedState: "",
      selectedCity: "",
      stateList: [...statesArr],
      recentSearches: []
    };
    this.onStateChange = this.onStateChange.bind(this);
    this.handleCityInput = this.handleCityInput.bind(this);
  }
  // componentDidMount() {
  //   fetch("http://localhost:5000/api/recentCities").then(recents => this.setState({ recents: recents }));
  //   console.log(this.state.recents);
  // }

  onStateChange(event) {
    let stateName = event.target.value;
    this.setState({ selectedState: stateName });
  }

  handleCityInput(event) {
    let cityName = event.target.value;
    this.setState({ selectedCity: cityName });
  }

  render() {
    let theCity = this.state.selectedCity;
    let theState = this.state.selectedState;
    let fiveDays = this.state.weather.slice(0, 5);

    if (this.state.weather.length === 0) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Dev-Weather</h1>
          </header>
          <input placeholder="City" onKeyUp={this.handleCityInput} />
          <br />
          <select onChange={this.onStateChange}>
            {statesArr.map(state => {
              return <option>{state}</option>;
            })}
          </select>
          <br />
          <button
            onClick={event => {
              axios.get(`http://api.wunderground.com/api/d7759f887f19d50b/forecast10day/q/${theState}/${theCity}.json`).then(res => {
                this.setState({ weather: res.data.forecast.simpleforecast.forecastday, recentSearches: [...theCity] });
              });
            }}
          >
            Get Weather
          </button>
          <h2>Enter City</h2>
          <h2>Recent Searches</h2>
          {console.log(this.state.recentSearches)}
        </div>
      );
    } else if (this.state.weather.length > 0) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Dev-Weather</h1>
          </header>
          <input placeholder="City" onKeyUp={this.handleCityInput} />
          <br />
          <select onChange={this.onStateChange}>
            {statesArr.map(state => {
              return <option>{state}</option>;
            })}
          </select>
          <br />
          <button
            onClick={event => {
              axios.get(`http://api.wunderground.com/api/d7759f887f19d50b/forecast10day/q/${theState}/${theCity}.json`).then(res => {
                this.setState({ weather: res.data.forecast.simpleforecast.forecastday, recentSearches: [...this.state.recentSearches, theCity] });
              });
            }}
          >
            Get Weather
          </button>
          {this.state.weather.length > 0 && (
            <div className="boxes">
              <h1>5 Day Forecast</h1>
              {fiveDays.map(day => {
                return (
                  <div className="forecast">
                    <li>{day.date.weekday}</li>
                    <li>{day.conditions}</li>
                    <li>High: {day.high.fahrenheit}</li>
                    <li>Low: {day.low.fahrenheit}</li>
                    <li>
                      <img src={day.icon_url} alt="weather icon" />
                    </li>
                  </div>
                );
              })}
            </div>
          )}
          <h2>Recent Searches</h2>
          {console.log(this.state.recentSearches)}
        </div>
      );
    }
  }
}

export default App;
