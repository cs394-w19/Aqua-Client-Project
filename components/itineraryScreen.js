import React from "react"
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput
} from "react-native"
import Dialog from "react-native-dialog"
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
        let upcomingItineraries
        let pastItineraries
        db.collection("users")
            .doc(user)
            .get()
            .then(userData => {
                upcomingItineraries = userData.data()["upcomingItineraries"]
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

    handleCreate(itineraryName) {
        if (!itineraryName) {
            itineraryName = ""
        }
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
                navigate("NewItinerary", {
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
                    <View style={styles.newItineraryBtn}>
                        <Text style={styles.newItineraryBtnText}>
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
        let itineraryName
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
                    <Dialog.Title>Name Your Itinerary</Dialog.Title>
                    <Dialog.Input
                        placeholder="Itinerary Name"
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
    newItineraryBtnText: {
        fontSize: 50,
        color: "white"
    },
    subHeader: {
        margin: 30,
        fontSize: 20,
        borderTopWidth: 2,
        textAlign: "center",
        width: 350,
        borderTopColor: "grey"
    }
})
