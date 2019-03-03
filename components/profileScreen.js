import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';

export default class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    render() {

        const {navigate} = this.props.navigation;
        const {state} = this.props.navigation;
        const db = state.params.db;
        const user = state.params.user;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Your Profile</Text>
                <View style={styles.profileContainer}>
                    <Image style={styles.imageStyling} source={require('../userpicture.png')}/>
                    <Text style={styles.userName}>{user}</Text>

                </View>
                <TouchableWithoutFeedback title="UserQuestionnaire"
                                          onPress={() => {
                                              navigate("ProfileQuestionnaire", {db: db, user: user})
                                          }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Update Preferences
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
        backgroundColor: '#fff',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    header: {
        flex: 0,
        padding: 20,
        fontSize: 30,
        paddingBottom: 0,
        color: "#1EA28A"
    },
    subHeader: {
        flex: 0,
        padding: 20,
        fontSize: 15
    },
    profileContainer: {
        marginTop: 20,
        flex: 0,
    },
    imageStyling: {
        width: 200,
        height: 200
    },
    userName:{
        textAlign: "center",
        flex: 0,
        padding: 20,
        fontSize: 30,
        paddingBottom: 0,
        color: "#1EA28A"
    },
    button: {
        width: 200,
        height: 50,
        margin: 30,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: "#1EA28A",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "white"
    }
});