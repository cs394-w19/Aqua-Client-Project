import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
let images = []
images[0] = require('../assets/locationPictures/0.jpg');
images[1] = require("../assets/locationPictures/1.jpg");
images[2] = require("../assets/locationPictures/2.jpg");
images[3] = require("../assets/locationPictures/3.jpg");
images[4] = require("../assets/locationPictures/4.jpg");
images[5] = require("../assets/locationPictures/5.jpg");
images[6] = require("../assets/locationPictures/6.jpg");
images[7] = require("../assets/locationPictures/7.jpg");
images[8] = require("../assets/locationPictures/8.jpg");
images[9] = require("../assets/locationPictures/9.jpg");
images[10] = require("../assets/locationPictures/10.jpg");
images[11] = require("../assets/locationPictures/11.jpg");
images[12] = require("../assets/locationPictures/12.jpg");
images[13] = require("../assets/locationPictures/13.jpg");
images[14] = require("../assets/locationPictures/14.jpg");
images[15] = require("../assets/locationPictures/15.jpg");
images[16] = require("../assets/locationPictures/16.jpg");
images[17] = require("../assets/locationPictures/17.jpg");


export default class ItineraryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listView: true
        }
    }

    render() {
        const {state} = this.props.navigation;
        const suggestions = state.params.suggestions;
        const suggestionItems = suggestions.map(s => (
            <View style={styles.itineraryItem}>
                <Image source={images[s.id]} style={{width: 80, height: 80}}/>
                <Text style={styles.itemDetails}>{s.name}</Text>
            </View>
        ))
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Your Saved Locations
                </Text>
                <View style={styles.tabContainer}>
                    <TouchableWithoutFeedback onPress={()=>this.setState({listView: true})}>
                        <View style={this.state.listView ? styles.tabActive : styles.tab}>
                            <Text>List</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.setState({listView: false})}>
                        <View style={!this.state.listView ? styles.tabActive : styles.tab}>
                            <Text>Map</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.listView && <ScrollView style={styles.itinerary}>
                    {suggestionItems}
                </ScrollView>}
                {!this.state.listView && <MapView
                style={styles.itinerary}
                provider={ PROVIDER_GOOGLE }
                region={{
                latitude: 48.857627,
                longitude: 2.336433,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
                }}
                />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    header: {
        flex: 0,
        padding: 20,
        fontSize: 30,
        paddingBottom: 0
    },
    itinerary: {
        marginTop: 20,
        width: 400,
        flex: 1,
        padding: 20,
    },
    itineraryItem: {
        margin: 5,
        borderBottomWidth: 1,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row'
    },
    itemDetails: {
        fontSize: 20,
        padding: 10,
        color: '#1EA28A'
    },
    tabContainer:{
        width: 300,
        height: 50,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#1EA28A',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    tab:{
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    tabActive: {
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1EA28A',
    }
});