import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SuggestedItem from './suggestedItem';
import Suggestions from '../suggestions.json';

export default class SuggestionScreen extends React.Component {
    retrieveSuggestions(location){
        const foundLocation = Suggestions.Locations.find(l => l.name === location);
        const fieldCat = foundLocation.Attractions.find(a => a.name === "Shedd Aquarium").Categories[0];
        console.log("HERE is the location " + fieldCat);
    }

    render() {
        const {state} = this.props.navigation
        console.log(state.params.state)
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Based on your profile, you may enjoy these sites in Rome...</Text>
                <Text style={styles.subHeader}> Add the ones you like and click 'Submit'</Text>
                <ScrollView>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        padding: 20,
        fontSize: 30
    },
    subHeader: {
        height: 50,
        padding: 20,
        fontSize: 20,
        marginBottom: 20
    }
});
