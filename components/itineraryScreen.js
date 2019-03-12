import React from "react"
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    TextInput
} from "react-native"
import Dialog from "react-native-dialog"

let images = []
images[0] = require("../assets/locationPictures/0.jpg")
images[1] = require("../assets/locationPictures/1.jpg")
images[2] = require("../assets/locationPictures/2.jpg")
images[3] = require("../assets/locationPictures/3.jpg")
images[4] = require("../assets/locationPictures/4.jpg")
images[5] = require("../assets/locationPictures/5.jpg")
images[6] = require("../assets/locationPictures/6.jpg")
images[7] = require("../assets/locationPictures/7.jpg")
images[8] = require("../assets/locationPictures/8.jpg")
images[9] = require("../assets/locationPictures/9.jpg")
images[10] = require("../assets/locationPictures/10.jpg")
images[11] = require("../assets/locationPictures/11.jpg")
images[12] = require("../assets/locationPictures/12.jpg")
images[13] = require("../assets/locationPictures/13.jpg")
images[14] = require("../assets/locationPictures/14.jpg")
images[15] = require("../assets/locationPictures/15.jpg")
images[16] = require("../assets/locationPictures/16.jpg")
images[17] = require("../assets/locationPictures/17.jpg")


export default class ItineraryScreen extends React.Component {
    static navigationOptions = {
        title: "Itineraries",
        headerTitleStyle: {
            marginRight: 56,
            color: "#1EA28A",
            textAlign: "center",
            flex: 1,
            fontSize: 20
        },
        tabBarLabel: "Itineraries"
    }

    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false,
            upcomingItineraries: [],
            pastItineraries: [],
            itineraryNames: {}
        }
        this.handleCreate = this.handleCreate.bind(this)
    }

    componentDidMount() {
        const db = this.props.db
        const user = this.props.user
        this.focusListener = this.props.navigation.addListener(
            "didFocus",
            () => {
                let upcomingItineraries
                let pastItineraries
                db.collection("users")
                    .doc(user)
                    .get()
                    .then(userData => {
                        upcomingItineraries = userData.data()[
                            "upcomingItineraries"
                        ]
                            ? userData.data()["upcomingItineraries"]
                            : []
                        pastItineraries = userData.data()["pastItineraries"]
                            ? userData.data()["pastItineraries"]
                            : []
                        this.setState({
                            upcomingItineraries: upcomingItineraries,
                            pastItineraries: pastItineraries
                        })
                        let itineraryNames = {}
                        db.collection("itineraries")
                            .where("users", "array-contains", user)
                            .get()
                            .then(itineraries => {
                                itineraries.forEach(i => {
                                    itineraryNames[i.id] = i.data().name
                                })
                                this.setState({
                                    itineraryNames: itineraryNames
                                })
                            })
                    })
            }
        )
    }

    handleCreate(itineraryName) {
        itineraryName = itineraryName ? itineraryName : ""
        const { navigate } = this.props.navigation
        this.setState({ dialogVisible: false })
        const db = this.props.db
        const user = this.props.user
        const itinerary = {
            name: itineraryName,
            city: "",
            locations: [],
            users: [user]
        }
        let upcomingItineraries = this.state.upcomingItineraries
        db.collection("itineraries")
            .add(itinerary)
            .then(rev => {
                upcomingItineraries.push(rev.id)
                db.collection("users")
                    .doc(user)
                    .set(
                        { upcomingItineraries: upcomingItineraries },
                        { merge: true }
                    )
                navigate("TripQuestionnaire", {
                    db: this.props.db,
                    user: this.props.user,
                    itineraryId: rev.id
                })
            })
    }

    openItinerary(itineraryId) {
        console.log("uhh this one" + itineraryId)
        const { navigate } = this.props.navigation
        navigate("Itinerary", {
            db: this.props.db,
            user: this.props.user,
            itineraryId: itineraryId
        })
    }

    render() {
        const upcomingItineraries = this.state.upcomingItineraries.map(i => {
            return (
                <TouchableWithoutFeedback onPress={() => this.openItinerary(i)}>
                    <View style={styles.upcomingItineraryBtn}>
                        <Image style={{position: "absolute", height: 100,
                            width: 300,
                            borderRadius: 10, opacity: 0.7}} source={images[Math.floor(Math.random() * 17)]}/>
                        <Text style={styles.itineraryBtnText}>
                            {this.state.itineraryNames[i]}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
        const pastItineraries = this.state.pastItineraries.map(i => {
            return (
                <TouchableWithoutFeedback onPress={() => this.openItinerary(i)}>
                    <View style={styles.newItineraryBtn}>
                        <Text style={styles.newItineraryBtnText}>
                            {this.state.itineraryNames[i]}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
        let itineraryName;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({ dialogVisible: true })}
                    >
                        <View style={styles.newItineraryBtn}>
                            <Text style={styles.newItineraryBtnText}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.subHeader}>Upcoming Trips</Text>
                    {upcomingItineraries}
                    <Text style={styles.subHeader}>Past Trips</Text>
                    {pastItineraries}
                </View>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Name Your Trip</Dialog.Title>
                    <Dialog.Input
                        placeholder="Trip Name"
                        value={itineraryName}
                        onChangeText={text => (itineraryName = text)}
                    />
                    <Dialog.Button
                        label="Cancel"
                        onPress={() => this.setState({ dialogVisible: false })}
                    />
                    <Dialog.Button
                        label="Create"
                        onPress={() => this.handleCreate(itineraryName)}
                    />
                </Dialog.Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 30
    },
    newItineraryBtn: {
        display: "flex",
        height: 100,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
        borderRadius: 10
    },
    upcomingItineraryBtn: {
        margin: 10,
        display: "flex",
        height: 100,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffffcc",
        borderRadius: 10
    },
    newItineraryBtnText: {
        fontSize: 50,
        color: "white"
    },itineraryBtnText: {
        fontSize: 40,
        color: "black"
    },
    subHeader: {
        marginTop: 30,
        fontSize: 20,
        borderTopWidth: 2,
        textAlign: "center",
        width: 350,
        borderTopColor: "grey"
    }
})
