import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import SuggestedItem from './suggestedItem';
import Suggestions from '../suggestions.json';

export default class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attractions: []
        }
    }

    componentDidMount = () => {
        const {state} = this.props.navigation;
        const attractions = this.retrieveSuggestions(state.params.categories);
        attractions.forEach(a => a.selected = false)
        this.setState({ attractions: attractions })
    }

    retrieveSuggestions(categories) {
        const foundAttractions = Suggestions.Locations[0].Attractions.filter(a => {
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

        foundAttractions.push(foundRestaurants)
        return foundAttractions
    }


    render() {
        const suggestions = this.state.attractions;
        const suggestedItems = suggestions.map((l) =>
            <SuggestedItem
                location={l}
                intersection={l.Categories.filter(x => categories.includes(x))}
                // handleItemSelect={}
            />)

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Based on your profile, you may enjoy these sites in Chicago...</Text>
                {/*<Text style={styles.subHeader}>Add the ones you like!</Text>*/}
                <View style={styles.suggestionsContainer}>
                    <ScrollView>
                        {suggestedItems}
                    </ScrollView>
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
