import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SuggestedItem from './suggestedItem';
import Suggestions from '../suggestions.json';

export default class SuggestionScreen extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            categories: []
        }
    }
    
    componentDidMount = () => {
        const {state} = this.props.navigation
        this.setState({categories:state.params.categories})
    }
    
    retrieveSuggestions(){
        const state = this.state
        const foundAttractions = Suggestions.Locations[0].Attractions.filter(a => {
            let intersection = a.Categories.filter(x => state.categories.includes(x));
            if (intersection.length > 0){
                return true
            }else
                return false
            }
        );
        const foundRestaurants = Suggestions.Locations[0].Restaurants.filter(r => r.Categories.includes(state.categories[0]));
        // const foundLocations = []
        // for (var i = 0; i< Suggestions.Locations.length; i++){
        //     let location = Suggestions.Locations[i]

        // }
       // if(Suggestions.Locations[0].Attractions[0].Categories.includes(state.categories[0])){
       //      console.log("works");
       //  }
        // console.log(foundAttractions)
        const suggestedItems = foundAttractions.map((l) => <SuggestedItem Location = {l} intersection={l.Categories.filter(x => state.categories.includes(x))}/> )
        const suggestedRestaurants = foundRestaurants.map((r) => <SuggestedItem Location = {r}/> )
        suggestedItems.push(suggestedRestaurants)
        return [suggestedItems,state.categories[0]]

    }
    

    render() {
        const Locations = this.retrieveSuggestions()[0]
        const Reasons = this.retrieveSuggestions()[1]
        console.log("type: " + typeof(Reasons) )
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Based on your profile, you may enjoy these sites in Chicago...</Text>
                <Text style={styles.subHeader}> Add the ones you like and click 'Submit'</Text>
                <View  style={styles.suggestionsContainer}>
                <ScrollView>
                    {Locations}
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
        flex:2,
        padding: 20,
        fontSize: 30
    },
    subHeader: {
        flex: 1,
        padding: 20,
        fontSize: 20
    },
    suggestionsContainer: {
        flex: 7,
    }
});
