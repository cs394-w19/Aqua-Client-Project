import React from "react"
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    TouchableHighlight
} from "react-native"
import SortableListView from "react-native-sortable-listview"
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import APIKey from "../apiKey.json"

// Insert the API KEY and remove it before you push
const GOOGLE_MAPS_APIKEY = APIKey.apiKey
let images = []
let markers = []
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

markers[0] = require("../assets/markers/0.png")
markers[1] = require("../assets/markers/1.png")
markers[2] = require("../assets/markers/2.png")
markers[3] = require("../assets/markers/3.png")
markers[4] = require("../assets/markers/4.png")
markers[5] = require("../assets/markers/5.png")
markers[6] = require("../assets/markers/6.png")
markers[7] = require("../assets/markers/7.png")
markers[8] = require("../assets/markers/8.png")
markers[9] = require("../assets/markers/9.png")
markers[10] = require("../assets/markers/10.png")
markers[11] = require("../assets/markers/11.png")
markers[12] = require("../assets/markers/12.png")
markers[13] = require("../assets/markers/13.png")
markers[14] = require("../assets/markers/14.png")
markers[15] = require("../assets/markers/15.png")
markers[16] = require("../assets/markers/16.png")
markers[17] = require("../assets/markers/17.png")

export default class Itinerary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listView: true,
            order: [],
            data: {},
            locations: [],
            id: null,
            name: null
        }
    }

    componentDidMount() {
        const {navigate} = this.props.navigation
        const {state} = this.props.navigation
        const db = state.params.db
        const itineraryId = state.params.itineraryId
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            let locations = []
            db.collection("itineraries")
                .doc(itineraryId)
                .get()
                .then(itinerary => {
                    locations = itinerary.data()["locations"]

                    let name = itinerary.data()["name"]
                    let data = {}

                    locations.forEach(s => (data[s.name] = {...s}))


                let order = itinerary.data()["order"]
                    ? itinerary.data()["order"]
                    : Object.keys(data)
                
                this.setState({
                    locations: locations,
                    name: name,
                    id: itineraryId,
                    order: order,
                    data: data,
                    db: db
                })
            })
    })
    }
    render() {
        const { state, navigate } = this.props.navigation
        const locations = this.state.locations
        let {order, data} = this.state

        console.log("114" + JSON.stringify(order))
        const markerItems = order.map((o, index) => {
            const location = locations.find(s => s.name === o)
            return (
                <Marker
                    coordinate={location.coordinates}
                    anchor={{x: 0.5, y: 0.8}}
                >
                    <Image
                        source={markers[location.id]}
                        style={{width: 138, height: 100}}
                    />
                    <View style={styles.mapItemIndex}>
                        <Text>{index + 1}</Text>
                    </View>
                </Marker>
            )
        })
        const coordinates = order.map(
            o => locations.find(s => s.name === o).coordinates
        )
        console.log("136" + JSON.stringify(order))
        return (
            <View style={styles.container}>
                <Text style={styles.header}> {this.state.name} </Text>
                <View style={styles.tabContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({listView: true})}
                    >
                        <View
                            style={
                                this.state.listView
                                    ? styles.tabActive
                                    : styles.tab
                            }
                        >
                            <Text>List</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({listView: false})}
                    >
                        <View
                            style={
                                !this.state.listView
                                    ? styles.tabActive
                                    : styles.tab
                            }
                        >
                            <Text>Map</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.listView && <Text style={styles.infoText}>Hold and drag items to sort</Text>}
                {this.state.listView && (
                    <SortableListView
                        removeClippedSubviews={false}
                        style={styles.itinerary}
                        sortRowStyle={{margin: 5, padding: 20}}
                        data={this.state.data}
                        order={this.state.order}
                        activeOpacity={0.7}
                        moveOnPressIn={true}
                        onRowMoved={e => {
                            let db = this.state.db
                            let o = this.state.order
                            console.log("before " + this.state.order)
                            o.splice(e.to, 0, o.splice(e.from, 1)[0])
                            console.log("after " + this.state.order)
                            this.setState({order: o})
                            db.collection("itineraries")
                                .doc(this.state.id)
                                .set({order: o}, {merge: true})
                        }}
                        renderRow={row => (
                            <RowComponent data={row} order={this.state.order}/>
                        )}
                    />

                )}
                {!this.state.listView && (
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
                        <MapViewDirections
                            origin={coordinates[0]}
                            waypoints={
                                coordinates.length > 2
                                    ? coordinates.slice(1, -1)
                                    : null
                            }
                            destination={coordinates[coordinates.length - 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            optimizeWaypoints={true}
                        />
                    </MapView>
                )}

                <TouchableWithoutFeedback onPress={() => navigate("NewItinerary", {
                    db: this.props.db,
                    user: this.props.user,
                    itineraryId: this.state.id
                })}>
                    <View style = {styles.editItineraryBtn}>
                        <Text style= {styles.editItineraryBtnText}>
                            + More Locations
                        </Text>
                    </View>

                </TouchableWithoutFeedback>
            </View>
        )
    }
}

class RowComponent extends React.Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={"#eee"}
                {...this.props.sortHandlers}
            >
                <View style={styles.itineraryItem}>
                    <Image
                        source={images[this.props.data.id]}
                        style={{width: 80, height: 80}}
                    />
                    <Text style={styles.itemDetails}>
                        {this.props.data.name}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 5
    },
    header: {
        flex: 0,
        fontSize: 30,
        fontWeight: "bold",
        color: '#1EA28A',
        margin: 20,
        paddingBottom: 0
    },
    itinerary: {
        width: 400,
        flex: 1,
        padding: 20
    },
    itineraryItem: {
        margin: 5,
        borderBottomWidth: 1,
        borderColor: "grey",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row"
    },
    itemDetails: {
        fontSize: 20,
        padding: 10,
        color: "#1EA28A"
    },
    tabContainer: {
        width: 300,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#1EA28A",
        flexDirection: "row",
        overflow: "hidden"
    },
    tab: {
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    tabActive: {
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1EA28A"
    },
    mapItemIndex: {
        width: 20,
        backgroundColor: "#1EA28A",
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        borderWidth: 2,
        borderColor: "black"
    },
    infoText: {
        fontSize: 15,
        height: 25,
        margin: 5,
        justifyContent: "center"
    },
    editItineraryBtn: {
        display: "flex",
        height: 40,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
        borderRadius: 20,
        margin: 10
    },
    editItineraryBtnText: {
        fontSize: 20,
        color: "white",
    },
})
