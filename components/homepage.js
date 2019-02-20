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
                        <Text style= {styles.buttonLabel}>
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
        backgroundColor: '#FF9A73',
        margin: 10,
        borderRadius: 10,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: 30,
        color: "#FFF"
    },
    header: {
        fontSize: 70,
        marginTop: 50,
        width: "100%",
        textAlign: "center",
        color: "#FF9A73",
        fontWeight: "600",
        height: 300,
        padding: 20,
    }
});