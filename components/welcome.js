import React from "react"
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native"

export default class App extends React.Component {
    constructor() {
        super()
        this.handleNextClick = this.handleNextClick.bind(this)
    }
    handleNextClick = () => {
        const { navigate } = this.props.navigation
        const { state } = this.props.navigation
        const db = state.params.db
        const user = state.params.user
        
        navigate("IntroQuestionnare", { db: db, user: user })
    }
    render() {
            return (
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.welcomeHeader}>WELCOME TO GLOCAL</Text>
                        <Text style={styles.welcomeSubHeader}>Tell us more about yourself to help us give you personalized recommendations!</Text>
                    </View>
                    <TouchableWithoutFeedback
                        title="Next Button"
                        onPress={this.handleNextClick}
                    >
                        <View style={styles.nextButton}>
                            <Text style={styles.submitText}>Begin</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        padding: 20
    },
    questionContainer: {
        flex: 0,
        paddingBottom: 150
    },
    welcomeHeader: {
        color: "#1EA28A",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 50
    },
    welcomeSubHeader: {
        color: "#1EA28A",
        textAlign: "center",
        fontSize: 23
    },
    questionText: {
        fontSize: 30
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#FF9A73",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "black"
    },

    optionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    buttonClicked: {
        color: "white",
        width: 100,
        height: 100,
        backgroundColor: "#FF9A73",
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#FF9A73",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonClickedText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "white"
    },
    submitButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        bottom: 50,
        marginHorizontal: "auto"
    },
    nextButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        position: "absolute",
        right: 30,
        bottom: 50
    },
    previousButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        position: "absolute",
        left: 30,
        bottom: 50
    },
    submitText: {
        fontSize: 20,
        height: 40,
        textAlign: "center",
        paddingVertical: 5
    }
})
