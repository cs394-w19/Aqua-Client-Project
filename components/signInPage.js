import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    ScrollView,
    View,
    Button
} from "react-native"
import firebase from "../firebase.js"

class Login extends Component {
    constructor() {
        super()
        this.db = firebase.firestore();
        this.fb = firebase;
        this.state = {
            signUpEmail: "",
            logInEmail: "",
            signUpPassword: "",
            logInPassword: "",
            userName: "",
            logInError: null,
            signUpError: null,
            user: null,
            db: null,
            loggedin: false
        }
    }

    handleLogin = event => {
        event.preventDefault()
        const { logInEmail, logInPassword } = this.state
        this.fb
            .auth()
            .signInWithEmailAndPassword(logInEmail, logInPassword)
            .then(user => {
                const { navigate } = this.props.navigation
                navigate("Homepage", { db: this.db, user: user.user.email })
            })
            .catch(error => {
                this.setState({ logInError: error })
            })

    }

    handleSignUp = event => {
        event.preventDefault()
        const {
            signUpEmail,
            signUpPassword,
            userName,
        } = this.state
        this.fb
            .auth()
            .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
            .then(user => {
                this.fb
                    .auth()
                    .signInWithEmailAndPassword(signUpEmail, signUpPassword)
                    .then(user => {
                        console.log(user.identifier)
                        const { navigate } = this.props.navigation
                        navigate("IntroQuestionnare", { db: this.db, user: user.user.email })
                    })
                    .catch(error => {
                        this.setState({ error: error })
                    })
            })
            .catch(error => {
                this.setState({ signUpError: error })
            })
    }

    render() {
        const {
            signUpEmail,
            logInEmail,
            signUpPassword,
            logInPassword,
            userName,
            signUpError,
            logInError
        } = this.state
        return (
            <View>
                <View>
                    <View style={styles.titleStyling}>
                        <Text>Log In</Text>
                    </View>
                </View>
                {logInError ? (
                    <View>
                        <View>
                            <Text>{logInError.message}</Text>
                        </View>
                    </View>
                ) : null}
                <View>
                    <View style={styles.logInForm}>
                        <View onSubmit={this.handleLogin}>
                            <TextInput
                                style={styles.ViewItem}
                                name="logInEmail"
                                placeholder="Email"
                                value={logInEmail}
                                onChangeText={(text) => { this.setState({ logInEmail: text }) }}
                            />
                            <TextInput
                                style={styles.ViewItem}
                                secureTextEntry={true}
                                name="logInPassword"
                                placeholder="Password"
                                value={logInPassword}
                                onChangeText={(text) => { this.setState({ logInPassword: text }) }}
                            />
                            <Button
                                style={styles.ButtonStyling}
                                children="Log In"
                                title="Log In"
                                onPress={this.handleLogin}
                            >
                                Log In
                            </Button>
                        </View>
                    </View>
                </View>
                <View />
                {signUpError ? (
                    <View>
                        <View>
                            <Text>{signUpError.message}</Text>
                        </View>
                    </View>
                ) : null}
                <View>
                    <View style={styles.signInForm}>
                        <View onSubmit={this.handleSignUp}>
                            <TextInput
                                style={styles.ViewItem}
                                name="signUpEmail"
                                placeholder="Email"
                                value={signUpEmail}
                                onChangeText={(text) => { this.setState({ signUpEmail: text }) }}
                            />
                            <TextInput
                                style={styles.ViewItem}
                                secureTextEntry={true}
                                name="signUpPassword"
                                placeholder="Password"
                                value={signUpPassword}
                                onChangeText={(text) => { this.setState({ signUpPassword: text }) }}
                            />
                            <TextInput
                                style={styles.ViewItem}
                                name="userName"
                                placeholder="User Name"
                                value={userName}
                                onChangeText={(text) => { this.setState({ userName: text }) }}
                            />
                            <Button
                                style={styles.ButtonStyling}
                                children="Sign Up"
                                title="Sign Up"
                                onPress={this.handleSignUp}
                            >
                                Sign Up
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleStyling: {
        textAlign: "center"
    },
    logInForm: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: 350,
        margin: "auto"
    },
    signInForm: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: 350,
        margin: "auto"
    },
    ViewItem: {
        width: 320
    },
    ButtonStyling: {
        backgroundColor: "#4CAF50",
        borderWidth: 0,
        color: "white",
        padding: 13,
        textAlign: "center",
        display: "flex",
        fontSize: 16,
        marginTop: 5
    }
})
export default Login
