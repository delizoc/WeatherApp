import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather.js';
import { weatherCoordinates } from './utils/WeatherCoordinates.js';


export default class App extends React.Component {
  state = {
    isLoading: true,
    temp: 0,
    snow: 0,
    weatherCode: 0,
    date: null,
    tempMin: null,
    tempMax: null,
    snowTotal: null,
    dailyWeatherCode: null,
  };
  

  componentDidMount() {
    const mountain = this.selectMountain();
    this.fetchWeather(mountain.lat, mountain.lon)
  }
  
  //update function to actually have user select which mountain forecast they want to view
  selectMountain() {
    return weatherCoordinates['crystal'];
  }

  fetchWeather(lat , lon) {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=snowfall&daily=weathercode,temperature_2m_max,temperature_2m_min,snowfall_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=3&timezone=America%2FLos_Angeles`
      // `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,,snowfall&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`
    )
    .then(res => res.json())
    .then(json => {
      console.log(json);
      // let array = json.daily.snowfall_sum;
      // let sum = array.reduce(function(a, b){
      //   return a + b;
      // });
      this.setState({
        temp: json.current_weather.temperature,
        snow: json.daily.snowfall_sum[0],
        weatherCode: json.current_weather.weathercode,
        date: json.daily.time,
        tempMin: json.daily.temperature_2m_min,
        tempMax: json.daily.temperature_2m_max,
        snowTotal: json.daily.snowfall_sum,
        dailyWeatherCode: json.daily.weathercode,
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading, temp, snow, weatherCode, date, tempMin, tempMax, snowTotal, dailyWeatherCode } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching the Weather</Text>
          </View>
        )  : <Weather temp={temp} snow={snow} weatherCode={weatherCode} date={date} tempMin={tempMin} tempMax={tempMax} snowTotal={snowTotal} dailyCodes = {dailyWeatherCode} /> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
