import React from 'react';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import SuggestedItem from './suggestedItem';
import Suggestions from '../suggestions.json';

export default class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            categories: []
        }
    }

    componentDidMount = () => {
        const {state} = this.props.navigation;
        const suggestions = this.retrieveSuggestions(state.params.categories);
        suggestions.forEach(a => a.selected = false)
        this.setState({suggestions: suggestions, categories: state.params.categories})
    }

    retrieveSuggestions(categories) {
        let foundAttractions = Suggestions.Locations[0].Attractions.filter(a => {
                let intersection = a.Categories.filter(x => categories.includes(x));
                if (intersection.length > 0) {
                    return true
                } else
                    return false
            }
        );
        const foundRestaurants = Suggestions.Locations[0].Restaurants.filter(r => {
            let intersection = r.Categories.filter(x => categories.includes(x));
            if (intersection.length > 0) {
                return true
            } else
                return false
        });
        foundAttractions = foundAttractions.concat(foundRestaurants)
        return foundAttractions
    }

    handleItemSelect = (name) => {
        const state = this.state;
        const suggestion = state.suggestions.find(s => s.name === name)
        suggestion.selected = !suggestion.selected;
        this.setState(state);
    }

    render() {
        const categories = this.state.categories;
        const {navigate} = this.props.navigation;
        const suggestions = this.state.suggestions
        const suggestedItems = suggestions.map((l) => {
            console.log("string    " + l.Categories)
            return (
                <SuggestedItem
                    location={l}
                    intersection={l.Categories.filter(x => categories.includes(x))}
                    handleItemSelect={this.handleItemSelect.bind(this)}
                    links={l.links}
                />)
        })
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Based on your profile, you may enjoy these sites in Chicago...</Text>
                {/*<Text style={styles.subHeader}>Add the ones you like!</Text>*/}
                <View style={styles.suggestionsContainer}>
                    <ScrollView>
                        {suggestedItems}
                    </ScrollView>
                </View>
                <View>
                    <Button
                        title="Go to Itinerary"
                        onPress={() => navigate('ItineraryScreen', {suggestions: this.state.suggestions.filter(s => s.selected)})}
                    />
                </View>
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
        flex: 0,
        padding: 20,
        fontSize: 30,
        paddingBottom: 0
    },
    subHeader: {
        flex: 0,
        padding: 20,
        fontSize: 15
    },
    suggestionsContainer: {
        marginTop: 20,
        flex: 1,
    }
});
