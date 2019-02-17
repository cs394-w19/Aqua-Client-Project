import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import questions from '../questions.json';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {questions: questions.questions};
        // let options = state.questions.map(q => {q.options.map(o => o ={o: false})})

    }
    render() {
        const questionItems = this.state.questions.map( q => {
            console.log(q.options.keys())
            const questionOptions = q.options.map(o => 
                <Text>
                    {Object.keys(o)}
                </Text>
            )
            return <View>
                    <Text> {q.text}</Text>
                    {questionOptions}

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