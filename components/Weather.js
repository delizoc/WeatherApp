import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherCondition } from "../utils/WeatherCondition";

const Weather = ({ temp, snow, weatherCode, date, tempMin, tempMax, snowTotal, dailyCodes}) => {
    let dates = dateFormat(date)
    let icons = getIcons(dailyCodes)
    return (

        <View style={[styles.weatherContainer,
            {backgroundColor:weatherCondition[weatherCode].color}
        ]}>
            <View style={styles.headerContainer}>
                {/* <Text style={styles.subtitle}>Current{'\n'}Conditions</Text> */}
                <Text style={styles.title}>{[weatherCondition[weatherCode].title, '\n', weatherCondition[weatherCode].subtitle]}</Text>
                <MaterialCommunityIcons size={72} name={weatherCondition[weatherCode].icon} color={'#fff'} />
                <Text style={styles.tempText}>{temp}˚F</Text>
                </View>
                <View style={styles.bodyContainer}>
                <Text style={styles.title}>Snow Total: {snow} in</Text>
            </View>
                <Table borderStyle={{borderWidth: 1}}>
                    <Row data={dates} />
                    <Row data={icons}/>
                    <Row data={tempMin}/>
                    <Row data={tempMax}/>
                    <Row data={snowTotal}/>
                </Table>

        </View>
    );
};
function dateFormat(dates){
    let weekDay = [];
    dates.forEach((value) => {weekDay.push(new Date(value).toLocaleString('en-us', { weekday: 'long'}))})
    return weekDay;    
}
function getIcons(weatherCodes){
    let icons = [];
    weatherCodes.forEach((value)=> {icons.push( <MaterialCommunityIcons name={weatherCondition[value].icon} />)})
    return icons;
}

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tempText: {
        fontSize: 72,
        color: '#fff'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    }
});

export default Weather;