import React from 'react';
import SuggestionScreen from './components/suggestionScreen';
import Questionnaire from './components/questionnaire';
import Homepage from './components/homepage.js';


import {createStackNavigator, createAppContainer} from 'react-navigation';

console.disableYellowBox = true;
const MainNavigator = createStackNavigator({
    Homepage: {screen: Homepage},
    Questionnaire: {screen: Questionnaire},
    SuggestionScreen: {screen: SuggestionScreen},
}, {
    defaultNavigationOptions: {
        title: 'perfect day',
        headerTitleStyle: {
            marginRight: 56,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: "#FF9A73",
            textAlign: 'center',
            flex: 1,
            fontSize: 40
        }
    }
});

const App = createAppContainer(MainNavigator);


export default App;
