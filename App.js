import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather.js'

export default class App extends React.Component {
  state = {
    isLoading: true,
    temp: 0,
    snow: 0,
    weatherCode: 0,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
        // this.fetchWeather(46.85, -121.76)
      },
      error => {
        this.setState({
          error: 'Error Getting Weather'
        });
      }
    );
  }

  fetchWeather(lat , lon) {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,,snowfall&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`
    )
    .then(res => res.json())
    .then(json => {
      console.log(json.current_weather.weathercode);
      this.setState({
        temp: json.current_weather.temperature,
        snow: json.hourly.snowfall[0],
        weatherCode: json.current_weather.weathercode,
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading, temp, snow, weatherCode } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching the Weather</Text>
          </View>
        )  : <Weather temp={temp} snow={snow} weatherCode={weatherCode} /> }
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
