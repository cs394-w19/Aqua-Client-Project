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
import LocationSelection from './components/locationSelection.js'
import {Image, View} from 'react-native'
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Icon from "./assets/checkbox-checked.png"
console.disableYellowBox = true;

let db = firebase.firestore();
let user;

const ItineraryStack = createStackNavigator({
    ItineraryScreen: props => <ItineraryScreen {...props} db={db} user={user}/>,
    NewItinerary: {screen: NewItinerary},
    LocationSelection: props => <LocationSelection {...props} db={db} user={user}/>,
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
        },
    }
})

const TabNavigator = createBottomTabNavigator({
    Browse: props => <SuggestionScreen db={db} user={user} {...props}/>,
    Collection: props => <CollectionScreen db={db} user={user} {...props}/>,
    Itineraries: ItineraryStack,
    Profile: ProfileStack
// },{
    // defaultNavigationOptions: ({ navigation }) => ({
    //     tabBarIcon: ({ focused, tintColor }) =>{
    //         console.log("yes")
    //         let icon =  getTabBarIcon(navigation, focused, tintColor)
    //
    //         console.log("no")
    //         return icon
    //     }

    // }),
    //     tabBarOptions: {
    //     activeTintColor: 'tomato',
    //         inactiveTintColor: 'gray',
    // },
}
)

const getTabBarIcon = (navigation, focused, tintColor) =>{
    console.log("Getting Icons")
    const { routeName } = navigation.state;
    // let iconName;
    // if (routeName === 'Home') {
    //     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    //     // We want to add badges to home tab icon
    //     IconComponent = HomeIconWithBadge;
    // } else if (routeName === 'Settings') {
    //     iconName = `ios-options${focused ? '' : '-outline'}`;
    // }

    // You can return any component that you like here!
    return (<View><Image source={Icon} /></View>);
}

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
