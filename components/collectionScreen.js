import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Image, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import APIKey from '../apiKey.json';


// Insert the API KEY and remove it before you push
const GOOGLE_MAPS_APIKEY = APIKey.apiKey;
let images = [];
let markers = [];
images[0] = require("../assets/locationPictures/0.jpg");
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
images[18] = require("../assets/locationPictures/18.jpg");
images[19] = require("../assets/locationPictures/19.jpg");
images[20] = require("../assets/locationPictures/20.jpg");
images[21] = require("../assets/locationPictures/21.jpg");
images[22] = require("../assets/locationPictures/22.jpg");
images[23] = require("../assets/locationPictures/23.jpg");
images[24] = require("../assets/locationPictures/24.jpg");
images[25] = require("../assets/locationPictures/25.jpg");
images[26] = require("../assets/locationPictures/26.jpg");
images[27] = require("../assets/locationPictures/27.jpeg");
images[28] = require("../assets/locationPictures/28.jpg");
images[29] = require("../assets/locationPictures/29.jpg");
images[30] = require("../assets/locationPictures/30.jpeg");

markers[0] = require("../assets/markers/0.png");
markers[1] = require("../assets/markers/1.png");
markers[2] = require("../assets/markers/2.png");
markers[3] = require("../assets/markers/3.png");
markers[4] = require("../assets/markers/4.png");
markers[5] = require("../assets/markers/5.png");
markers[6] = require("../assets/markers/6.png");
markers[7] = require("../assets/markers/7.png");
markers[8] = require("../assets/markers/8.png");
markers[9] = require("../assets/markers/9.png");
markers[10] = require("../assets/markers/10.png");
markers[11] = require("../assets/markers/11.png");
markers[12] = require("../assets/markers/12.png");
markers[13] = require("../assets/markers/13.png");
markers[14] = require("../assets/markers/14.png");
markers[15] = require("../assets/markers/15.png");
markers[16] = require("../assets/markers/16.png");
markers[17] = require("../assets/markers/17.png");

const unCheckedBox = require('../assets/heart-green.png');


export default class CollectionScreen extends React.Component {

    static navigationOptions = {
        title: 'Collection',
        headerTitleStyle: {
            marginRight: 56,
            color: "#1EA28A",
            textAlign: 'center',
            flex: 1,
            fontSize: 20
        },tabBarIcon: ({ focused, horizontal, tintColor})=>(<Image source={unCheckedBox}/>)
    }

    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            savedLocations: []
        }
    }

    componentWillMount() {
        const db = this.props.db
        const user = this.props.user
        let savedLocations = []
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            db.collection("users")
                .doc(user)
                .get()
                .then(userData => {
                    let userSavedLocations = userData.data()["savedLocations"] ? userData.data()["savedLocations"] : []
                    savedLocations = userSavedLocations
                    this.setState({savedLocations: savedLocations})
                })
        })
    }

    render() {
        const savedLocations = this.state.savedLocations
        const markerItems = savedLocations.map((s) => {
                return (
                    <Marker coordinate={s.coordinates} anchor={{x: 0.5, y: 0.8}}>
                        <Image source={markers[s.id]} style={{width: 138, height: 100}}/>
                    </Marker>)
            }
        )
        const items = savedLocations.map(row => <RowComponent data={row}/>)
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Collection</Text>
                <View style={styles.tabContainer}>
                    <TouchableWithoutFeedback onPress={() => this.setState({listView: true})}>
                        <View style={this.state.listView ? styles.tabActive : styles.tab}>
                            <Text>List</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.setState({listView: false})}>
                        <View style={!this.state.listView ? styles.tabActive : styles.tab}>
                            <Text>Map</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.listView &&
                <ScrollView>
                    <View>
                    {items}
                    </View>
                </ScrollView>
                }
                {!this.state.listView &&
                <MapView
                    style={styles.itinerary}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: 48.857627,
                        longitude: 2.336433,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                >
                    {markerItems}
                </MapView>}
            </View>
        );
    }
}

class RowComponent extends React.Component {
    render() {
        return (
            <View
                style={styles.itineraryItem}>
                <Image source={images[this.props.data.id]} style={{width: 80, height: 80}}/>
                <Text style={styles.itemDetails}>{this.props.data.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    header: {
        margin: 20,
        flex: 0,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        color: '#1EA28A'
    },
    itinerary: {
        width: 400,
        flex: 1,
        padding: 20,
    },
    itineraryItem: {
        margin: 5,
        width: 350,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        flexDirection: 'row'
    },
    itemDetails: {
        fontSize: 20,
        padding: 10,
        color: '#1EA28A'
    },
    tabContainer: {
        width: 300,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1EA28A',
        flexDirection: 'row',
        overflow: 'hidden',
        marginBottom: 5
    },
    tab: {
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
    },
    mapItemIndex: {
        width: 20,
        backgroundColor: '#1EA28A',
        color: "black",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: "black",

    },
    infoText: {
        fontSize: 20,
        height: 25,
        margin: 15,
        justifyContent: 'center',
    }
});
