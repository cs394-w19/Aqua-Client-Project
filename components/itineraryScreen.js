import React from "react"
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView, TextInput
} from "react-native"
import Dialog from "react-native-dialog";
export default class ItineraryScreen extends React.Component {
    static navigationOptions = {
        title: 'Itineraries',
        headerTitleStyle: {
            marginRight: 56,
            color: "#1EA28A",
            textAlign: 'center',
            flex: 1,
            fontSize: 20
        },
        tabBarLabel: 'Itineraries'
    }

    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        let itineraryName;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({dialogVisible: true})}>
                        <View style={styles.newItineraryBtn}>
                            <Text style={styles.newItineraryBtnText}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.subHeader}>Upcoming Trips</Text>
                    <Text style={styles.subHeader}>Past Trips</Text>
                </View>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Name Your Itinerary</Dialog.Title>
                    <Dialog.Input placeholder="Itinerary Name"
                                  value={itineraryName}
                                  onChangeText={(text) =>itineraryName=text }/>
                    <Dialog.Button label="Cancel" onPress={() => this.setState({dialogVisible: false})}/>
                    <Dialog.Button label="Create" onPress={()=>{
                        this.setState({dialogVisible: false})
                        navigate('NewItinerary', {db: this.props.db, user: this.props.user, itineraryName: itineraryName})}
                    }/>
                </Dialog.Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    },
    newItineraryBtn: {
        display: 'flex',
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