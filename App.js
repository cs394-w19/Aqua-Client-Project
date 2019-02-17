import React from 'react';
import SuggestionScreen from './components/suggestionScreen';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
    // Questionnaire : {screen: Questionnaire},
    SuggestionScreen: {screen: SuggestionScreen}
});

const App = createAppContainer(MainNavigator);



export default App;
