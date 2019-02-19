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
        const foundAttractions = Suggestions.Locations[0].Attractions.filter(a => 
            a.Categories.includes(state.categories[0])
        );
        const foundRestaurants = Suggestions.Locations[0].Restaurants.filter(r => r.Categories.includes(state.categories[0]));
        // const foundLocations = []
        // for (var i = 0; i< Suggestions.Locations.length; i++){
        //     let location = Suggestions.Locations[i]

        // }
       if(Suggestions.Locations[0].Attractions[0].Categories.includes(state.categories[0])){
            console.log("works");
        }
        console.log(foundAttractions)
        const suggestedItems = foundAttractions.map((l) => <SuggestedItem Location = {l}/> )
        const suggestedRestaurants = foundRestaurants.map((r) => <SuggestedItem Location = {r}/> )
        suggestedItems.push(suggestedRestaurants)
        return suggestedItems

    }
    

    render() {
        const {state} = this.props.navigation
        // this.setState({categories:state.params.categories})
        console.log("filtered" + state.params.categories)
        const Locations = this.retrieveSuggestions()
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Based on your profile, you may enjoy these sites in Chicago...</Text>
                <Text style={styles.subHeader}> Add the ones you like and click 'Submit'</Text>
                <ScrollView>
                    {Locations}
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
