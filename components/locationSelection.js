import React from "react"
import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback
} from "react-native"
import {NavigationActions, StackActions} from "react-navigation";

export default class newItinerary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            categories: [],
            city: '',
            db: null,
            user: null,
            itineraryId: null
        }
        this.handleCreate = this.handleCreate.bind(this)
    }

    handleCreate(){
        const { navigate, state } = this.props.navigation
        const db = this.props.db
        const user = this.props.user
        const itineraryId = state.params.itineraryId
        db.collection("itineraries")
            .doc(itineraryId)
            .set(
                { city: this.state.city },
                { merge: true }
                ).then(
            navigate("TripQuestionnaire", {
                db: db,
                user: user,
                itineraryId: itineraryId
            })
        )
    }

    render() {
        return(
            <View style = {styles.container}>
                <Text style={styles.inputHeader}>
                    Where ya going?
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({city:text})}
                    value={this.state.city}
                    style={styles.locationInput}
                >
                </TextInput>
                <TouchableWithoutFeedback style={styles.button} title={"submit"} onPress={this.handleCreate}>
                    <View>
                        <Text style = {styles.buttonText}>
                            Create
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    },
    inputHeader: {
        marginTop: 20,
        fontSize: 35
    },
    locationInput: {
        marginTop: 65,
        width: 250,
        height:70,
        fontSize:45,
        padding:15,
        borderWidth: 2
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#1EA28A",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "black"
    }
});