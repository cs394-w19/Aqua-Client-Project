import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SuggestedItem from './suggestedItem';

export default class SuggestionScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Based on your profile, you may enjoy these sites in Rome...</Text>
                <ScrollView>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
                        <SuggestedItem/>
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
        height: 150,
        padding: 20,
        fontSize: 30
    }
});
