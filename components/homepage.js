import React from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native"
import firebase from "../firebase.js"

export default class Homepage extends React.Component {
    constructor() {
        super()
        this.db = firebase.firestore();
        this.fb = firebase;
        this.state = {
            user: "newUser",
            db: null,
            loggedin: false
        }
    }

    getUser2(userId) {
        if (userId == "simeon") {
            this.db
                .collection("users")
                .doc(userId)
                .set({
                    mood: "kill me"
                }).then(res => {
                console.log("Document successfully written!")
            })
        }
    }
    componentDidMount() {
        this.getUser2("simeon")
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
                        navigate("TripQuestionnaire", {db: this.db, user: this.state.user})
                    }}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonLabel}>Plan Your Trip!</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    title="UpdateProfile"
                    onPress={() => {
                        navigate("ProfileScreen", {db: this.db, user: this.state.user})
                    }}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonLabel}>Profile</Text>
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
