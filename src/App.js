import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles.js'
import Form from './components/Form.js'
import Weather from './components/Weather.js'

const API_KEY = "71dc1461152b19f799ee66f3b32fc756";

class App extends Component {
    state = {   //Initial state
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    };
    getWeather = async (e) => {
    e.preventDefault(); //Stops the page from auto-refresh used in SPA's (JS property)  
    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`); //makes API call
    const data = await api_call.json(); //converts the data to JSON
    if (city && country) {
            this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""
            });
    } else {
            this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: "Please enter the values."
            });
        }
    }
    render() {
        return (
          <div>
            <div className="wrapper">
              <div className="main">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-5 title-container">
                      <Titles />
                    </div>
                    <div className="col-xs-7 form-container">
                      <Form getWeather={this.getWeather} />
                      <Weather 
                        temperature={this.state.temperature} 
                        humidity={this.state.humidity}
                        city={this.state.city}
                        country={this.state.country}
                        description={this.state.description}
                        error={this.state.error}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };
    

    export default App;
