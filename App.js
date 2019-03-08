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
import NewItinerary from "./components/newItinerary"
import Itinerary from "./components/itinerary"
import firebase from "./firebase.js"

import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

console.disableYellowBox = true;

let db = firebase.firestore();
let user;

const ItineraryStack = createStackNavigator({
    ItineraryScreen: props => <ItineraryScreen {...props} db={db} user={user}/>,
    NewItinerary: {screen: NewItinerary},
    TripQuestionnaire: props => <TripQuestionnaire {...props} db={db} user={user}/>,
    Itinerary: props => <Itinerary {...props} db={db} user={user}/>
}, {
    defaultNavigationOptions: {
        title: 'Itineraries',
        headerTitleStyle: {
            color: "#1EA28A",
            textAlign: 'center',
            flex: 1,
            fontSize: 20
        },
    }
})

const ProfileStack = createStackNavigator({
    ProfileScreen: props => <ProfileScreen db={db} user={user} {...props}/>,
    ProfileQuestionnaire: props => <ProfileQuestionnaire db={db} user={user} {...props}/>,
}, {
    defaultNavigationOptions: {
        title: 'Profile',
        headerTitleStyle: {
            color: "#1EA28A",
            textAlign: 'center',
            alignSelf: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            fontSize: 20
        },
        headerButton: {
            width: 50
        }
        ,
    }
})

const TabNavigator = createBottomTabNavigator({
    Browse: props => <SuggestionScreen db={db} user={user} {...props}/>,
    Collection: props => <CollectionScreen db={db} user={user} {...props}/>,
    Itineraries: ItineraryStack,
    Profile: ProfileStack
})

const MainNavigator = createStackNavigator({
    Login: (props) => <Login {...props} handleLogin={(u) => user = u}/>,
    Welcome: props => <Welcome db={db} user={user} {...props} />,
    IntroQuestionnare: props => <IntroQuestionnare db={db} user={user} {...props}/>,
    Main: TabNavigator,
}, {
    defaultNavigationOptions: {
        header: null
    }
})


const App = createAppContainer(MainNavigator);


export default App;
