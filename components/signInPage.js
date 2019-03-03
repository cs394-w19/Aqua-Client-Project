import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
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
    handleGuest = event => {
        this.db.collection("users").doc("guest@gmail.com").delete();
        event.preventDefault()
        const {guestUserName, guestPassWord} = this.state;
        const { navigate } = this.props.navigation
        navigate("Homepage", { db: this.db, user: "guest@gmail.com"})

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
            signUpPassword
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
                        navigate("Homepage", { db: this.db, user: user.user.email })
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
            signUpError,
            logInError
        } = this.state
        return (
            <View style={styles.container}>
            <View>
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
                            <TouchableWithoutFeedback onPress={this.handleLogin} style={styles.button}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonLabel}>Login</Text>
                                </View>
                            </TouchableWithoutFeedback>
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
                        <View style={styles.ViewItem} onSubmit={this.handleSignUp}>
                            <TextInput
                                name="signUpEmail"
                                placeholder="Email"
                                value={signUpEmail}
                                onChangeText={(text) => { this.setState({ signUpEmail: text }) }}
                            />
                            <TextInput
                                secureTextEntry={true}
                                name="signUpPassword"
                                placeholder="Password"
                                value={signUpPassword}
                                onChangeText={(text) => { this.setState({ signUpPassword: text }) }}
                            />
                            <TouchableWithoutFeedback onPress={this.handleSignUp} style={styles.button}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonLabel}>Sign Up</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        <View style={styles.buttonStyling}>
                            <TouchableWithoutFeedback onPress={this.handleGuest} style={styles.button}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonLabel}>Sign In As Guest</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        </View>
                    </View>
                </View>
            </View>
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
    logInForm: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 30,
        width: 310,
        margin: "auto"
    },
    signInForm: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 30,
        width: 310
    },
    buttonLabel: {
        fontSize: 30,
        color: "#FFF"
    },
    button: {
        height: 50,
        backgroundColor: "#1EA28A",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center"
    },
    buttonStyling: {
        marginTop: 20
    }
})
export default Login
