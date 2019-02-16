import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SuggestedItem from './components/suggestedItem';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Based on your profile, you may enjoy these sites in Rome...</Text>
        <View>
        	<Text>Add to Itinerary</Text>
        	<View>
        	</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
