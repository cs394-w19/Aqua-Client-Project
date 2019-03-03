import React from 'react';
import SuggestionScreen from './components/suggestionScreen';
import TripQuestionnaire from './components/tripQuestionnaire';
import ProfileQuestionnaire from './components/profileQuestionnaire';
import Homepage from './components/homepage';
import ItineraryScreen from './components/itineraryScreen';
import ProfileScreen from './components/profileScreen';


import {createStackNavigator, createAppContainer} from 'react-navigation';

console.disableYellowBox = true;
const MainNavigator = createStackNavigator({
    Homepage: {screen: Homepage},
    ProfileScreen: {screen: ProfileScreen},
    ProfileQuestionnaire: {screen: ProfileQuestionnaire},
    TripQuestionnaire: {screen: TripQuestionnaire},
    SuggestionScreen: {screen: SuggestionScreen},
    ItineraryScreen: {screen: ItineraryScreen}
});

const App = createAppContainer(MainNavigator);


export default App;
