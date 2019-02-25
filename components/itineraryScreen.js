import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

export default class ItineraryScreen extends React.Component {
    render() {
        const {state} = this.props.navigation;
        const suggestions = state.params.suggestions;
        const time = ['08:00', '10:00', "14:00", "18:00"]
        let counter = 0
        const suggestionItems = suggestions.map(s => (
            <View style={styles.itineraryItem}>
                <View>
                    <Text style={styles.itemDetails}>{time[counter++]}</Text>
                </View>
                <View style={styles.attractionContainer}>
                    <Text style={styles.itemDetails}>{s.name}</Text>
                </View>
            </View>
        ))
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Your Itinenary
                </Text>
                <View style={styles.itinerary}>
                    {suggestionItems.slice(0, 4)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    header: {
        flex: 0,
        padding: 20,
        fontSize: 30,
        paddingBottom: 0
    },
    itinerary: {
        flex: 0,
        padding: 20,
        paddingBottom: 0,
    },
    itineraryItem: {
        flexDirection: 'row',
        backgroundColor: '#FF9A73',
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    itemDetails: {
        fontSize: 20,
        padding: 10,
        color: 'white'
    },
    attractionContainer:{
        borderLeftWidth: 1,
    }
});