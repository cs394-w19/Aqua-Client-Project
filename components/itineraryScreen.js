import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

export default class ItineraryScreen extends React.Component {
	render() {
        const {state} = this.props.navigation;
        const suggestions = state.params.suggestions
        const time = ['08:00', '10:00', "14:00", "18:00"]
        let counter = 0
        const suggetionItems = suggestions.map(s =>(
        	<View><View><Text>{time[counter++]}</Text></View><View><Text>{s.name}</Text></View></View>
        	) )
		return (
			<View>
			<Text style={styles.header}>
			Your Itinenary
			</Text>
			<View>
				{suggetionItems.slice(0,4)}
			</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flex: 0,
		padding: 20, 
		fontSize: 30,
		paddingBottom: 0

	}
});