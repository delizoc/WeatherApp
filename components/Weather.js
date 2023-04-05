import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherCondition } from '../utils/WeatherCondition';

const Weather = ({ temp, snow, weatherCode }) => {
    return (
        <View style={[styles.weatherContainer,
            {backgroundColor:weatherCondition[weatherCode].color}
        ]}>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons size={72} name={weatherCondition[weatherCode].icon} color={'#fff'} />
                <Text style={styles.tempText}>{temp}˚F</Text>
                </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Snow Total: {snow} in</Text>
                <Text style={styles.subtitle}>{weatherCondition[weatherCode].title}</Text>
                <Text style={styles.subtitle}>{weatherCondition[weatherCode].subtitle}</Text>
            </View>
        </View>
    );
};

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
        alignItems: 'flex-start',
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