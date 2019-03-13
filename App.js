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
import ExplIcon from "./assets/navBarIcons/Icon-01.png"
import ColIcon from "./assets/navBarIcons/Icon-02.png"
import ProfIcon from "./assets/navBarIcons/Icon-04.png"
import ItinIcon from "./assets/navBarIcons/Icon-03.png"
import ExplIconGreen from "./assets/navBarIcons/Icon-05.png"
import ColIconGreen from "./assets/navBarIcons/Icon-06.png"
import ItinIconGreen from "./assets/navBarIcons/Icon-07.png"
import ProfIconGreen from "./assets/navBarIcons/Icon-08.png"
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
        header:null
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
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>{
            let icon =  getTabBarIcon(navigation, focused, tintColor)
            return icon
        }
    }),
        tabBarOptions: {
        activeTintColor: '#1EA28A',
            inactiveTintColor: 'gray',
    },
}
)

const getTabBarIcon = (navigation, focused, tintColor) =>{
    const { routeName } = navigation.state;
    let icon
    switch(routeName){
        case "Browse":
            icon = focused ? ExplIconGreen : ExplIcon
            break
        case "Collection":
            icon = focused ? ColIconGreen : ColIcon
            break
        case "Itineraries":
            icon = focused ? ItinIconGreen : ItinIcon
            break
        case "Profile":
            icon = focused ? ProfIconGreen : ProfIcon
    }
    return <Image source={icon} style={{width: 30, height: 30}} />;
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
