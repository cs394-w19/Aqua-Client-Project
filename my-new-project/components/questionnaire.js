import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import questions from '../questions.json';

export default class App extends React.Component {

    render() {
        const questionItems = questions.questions.map( q => {
            return <View>
                    <Text> {q.text}</Text>
            </View>
        });
        return (
            <View style={styles.container}>
                {questionItems}
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