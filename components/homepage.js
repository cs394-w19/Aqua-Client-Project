import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Questionnaire from './questionnaire';

export default class Homepage extends React.Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Perfect Day</Text>
                <TouchableWithoutFeedback title="PlanTrip"
                                          onPress= {()=> {
                                             navigate("Questionnaire")}} >
                    <View style= {styles.button}>
                        <Text>
                            Plan Your Trip!
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
    },
    button: {
        width: "85%",
        height: 75,
        backgroundColor: '#e8da96',
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35
    },
    header: {
        fontSize: 40,
        width: "100%",
        textAlign: "center",
        color: "#0e5614",
        fontWeight: "600",
        height: 300,
        padding: 20,
    }
});