import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Image, TouchableHighlight} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'

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


export default class ItineraryScreen extends React.Component {

    static navigationOptions = {
        title: 'Saved Locations',
        headerTitleStyle: {
            marginRight: 56,
            color: "#1EA28A",
            textAlign: 'center',
            flex: 1,
            fontSize: 30
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            order: [],
        }
    }

    componentWillMount() {
        const {state} = this.props.navigation;
        const suggestions = state.params.suggestions;
        this.data = {};
        suggestions.forEach(s =>
            this.data[s.name] = s
        )
        this.setState({order: Object.keys(this.data)})
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
        const markerItems = suggestions.map(s => (
            <Marker coordinate={s.coordinates}>
                <Image source={markers[s.id]} style={{width: 100, height: 100}}/>
            </Marker>
        ))
        let order = this.state.order
        return (
            <View style={styles.container}>
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
                <SortableListView
                    style={styles.itinerary}
                    data={this.data}
                    order={order}
                    onRowMoved={e => {
                        order.splice(e.to, 0, order.splice(e.from, 1)[0])
                        this.setState({order: order})
                    }}
                    renderRow={row => <RowComponent data={row}/>}
                />}
                {!this.state.listView && <MapView
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
            <TouchableHighlight
                underlayColor={'#eee'}
                {...this.props.sortHandlers}
            >
                <View
                    style={styles.itineraryItem}>
                    <Image source={images[this.props.data.id]} style={{width: 80, height: 80}}/>
                    <Text style={styles.itemDetails}>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30
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
    tabContainer: {
        width: 300,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1EA28A',
        flexDirection: 'row',
        overflow: 'hidden'
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
    }
});