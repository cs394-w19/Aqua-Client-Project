import React from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native"
import Questionnaire from "./questionnaire"
import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB11yCSN9x1kE7Th3yZk_YnSBiizCyaVqQ",
    authDomain: "https://glocal-1234.firebaseapp.com",
    databaseURL: "https://glocal-1234.firebaseio.com",
    storageBucket: "gs://glocal-1234.appspot.com"
}

firebase.initializeApp(firebaseConfig)

export default class Homepage extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null,
            db: null,
            loggedin: false
        }
    }

    getUser(userId) {
        if (userId == "simeon") {
            firebase
                .database()
                .ref("users/" + userId)
                .set({
                    mood: "kill me"
                })
        }
    }

    componentDidMount() {
        this.getUser("simeon")
    }

    static navigationOptions = { header: null }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Glocal</Text>
                <TouchableWithoutFeedback
                    title="PlanTrip"
                    onPress={() => {
                        navigate("Questionnaire")
                    }}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonLabel}>Plan Your Trip!</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    button: {
        width: "85%",
        height: 75,
        backgroundColor: "#1EA28A",
        margin: 10,
        borderRadius: 10,
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonLabel: {
        fontSize: 30,
        color: "#FFF"
    },
    header: {
        fontSize: 100,
        marginTop: 80,
        textAlign: "center",
        color: "#1EA28A",
        height: 300,
        padding: 20
    }
})
