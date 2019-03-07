import React from "react"
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native"

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
   render(){
       const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=>navigate('NewItinerary', {db:this.props.db, user:this.props.user})}>
                    <View style={styles.newItineraryBtn}>
                        <Text style={styles.newItineraryBtnText}>+</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.subHeader}>Upcoming Trips</Text>
                <Text style={styles.subHeader}>Past Trips</Text>
                </View>
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