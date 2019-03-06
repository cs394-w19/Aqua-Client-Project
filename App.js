import React from 'react';
import SuggestionScreen from './components/suggestionScreen';
import TripQuestionnaire from './components/tripQuestionnaire';
import ProfileQuestionnaire from './components/profileQuestionnaire';
import Homepage from './components/homepage';
import CollectionScreen from './components/collectionScreen';
import ItineraryScreen from './components/itineraryScreen';
import ProfileScreen from './components/profileScreen';
import Login from './components/signInPage';
import IntroQuestionnare from './components/introQuestionnare.js';
import Welcome from './components/welcome'


import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

console.disableYellowBox = true;


const TabNavigator = createBottomTabNavigator({
    Browse: props=><SuggestionScreen {...props}/>,
    Collection: props=><CollectionScreen {...props}/>,
    Itinerary: {screen: ItineraryScreen},
    Profile: props=><ProfileScreen {...props}/>,
})

const MainNavigator = createStackNavigator({
    Login: { screen: Login },
    Welcome: {screen: Welcome },
    IntroQuestionnare: { screen: IntroQuestionnare},
    Main: TabNavigator,
    ProfileQuestionnaire: {screen: ProfileQuestionnaire},
})


const App = createAppContainer(MainNavigator);


export default App;
