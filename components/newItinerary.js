import React from "react"
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native"
import Suggestions from "../suggestions.json"
import profileQuestions from "../profileQuestions.json"
import {NavigationActions, StackActions} from "react-navigation";

let images = []
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

export default class newItinerary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            categories: [],
            savedLocations: [],
            blogVisible: false,
            blogLink: null,
            db: null,
            user: null,
            name: null,
            itineraryId: null
        }
        this.handleCreate = this.handleCreate.bind(this)
    }

    componentDidMount = () => {
        const { state } = this.props.navigation
        const db = state.params.db
        const user = state.params.user
        const itineraryId = state.params.itineraryId
        db.collection("users")
            .doc(user)
            .get()
            .then(userData => {
                let userPreferences = userData.data()["preferences"]
                    ? userData.data()["preferences"]
                    : []
                let userSavedLocations = userData.data()["savedLocations"]
                    ? userData.data()["savedLocations"]
                    : []
                let categories = []
                profileQuestions.questions.forEach(q =>
                    q.options.forEach(o => {
                        if (
                            userPreferences[q.text].find(
                                option => option === o.name
                            )
                        ) {
                            categories = categories.concat(o.Categories)
                        }
                    })
                )
                let suggestions = this.retrieveSuggestions(categories)
                suggestions = suggestions.filter(
                    s =>
                        userSavedLocations.find(l => l.name === s.name) ===
                        undefined
                )
                let previouslyChosenLocations = []
                db.collection("itineraries").doc(itineraryId).get().then(it => {
                    if(it.data()["order"]){
                       previouslyChosenLocations =  previouslyChosenLocations.concat(it.data()["order"]);
                    }

                    let name = it.data()["name"]

                    suggestions.forEach(s => {
                        if(previouslyChosenLocations.find(p => (s.name === p)) ===undefined){
                            s.selected = false;
                        }
                        else {
                            s.selected = true;
                        }
                    })
                    userSavedLocations.forEach(l => {
                        if(previouslyChosenLocations.find(p => (l.name === p)) ===undefined){
                            l.selected = false;
                        }
                        else {
                            l.selected = true;
                        }
                    })
                    this.setState({
                        suggestions: suggestions,
                        categories: categories,
                        savedLocations: userSavedLocations,
                        blogVisible: false,
                        user: user,
                        db: db,
                        name: name,
                        itineraryId: itineraryId
                    })
                })
            })
    }

    retrieveSuggestions(categories) {
        let foundAttractions = Suggestions.Locations[1].Attractions.filter(
            a => {
                let intersection = a.Categories.filter(x =>
                    categories.includes(x)
                )
                if (intersection.length > 0) {
                    return true
                } else return false
            }
        )
        const foundRestaurants = Suggestions.Locations[1].Restaurants.filter(
            r => {
                let intersection = r.Categories.filter(x =>
                    categories.includes(x)
                )
                if (intersection.length > 0) {
                    return true
                } else return false
            }
        )
        foundAttractions = foundAttractions.concat(foundRestaurants)
        return foundAttractions
    }

    handleItemSelect = name => {
        const state = this.state
        const db = this.state.db
        const user = this.state.user
        let location
        if (state.suggestions.find(s => s.name === name)) {
            location = state.suggestions.find(s => s.name === name)
            location.selected = !location.selected
            this.setState(state)
        } else {
            location = state.savedLocations.find(s => s.name === name)
            location.selected = !location.selected
            this.setState(state)
        }
    }

    handleCreate = () => {
        const { navigate } = this.props.navigation
        const { state } = this.props.navigation
        const db = this.state.db
        const user = this.state.user
        const itineraryId = this.state.itineraryId
        let itineraryItems = this.state.savedLocations.filter(l => l.selected)

        itineraryItems = itineraryItems.concat(
            this.state.suggestions.filter(s => s.selected)
        )

        db.collection("itineraries")
            .doc(itineraryId)
            .set({ locations: itineraryItems, order: itineraryItems.map(i => i.name) }, { merge: true })
            .then(rev => {
                const resetAction = StackActions.reset({
                    index: 1,
                    actions: [ NavigationActions.navigate({
                        routeName: 'ItineraryScreen'}),
                        NavigationActions.navigate({
                        routeName: 'Itinerary', params: {
                            db: db,
                            user: user,
                            itineraryId: itineraryId} })]
                });
                this.props.navigation.dispatch(resetAction);
            })
    }

    render() {
        const { categories, suggestions, savedLocations, name } = this.state
        const suggestedItems = suggestions.map(l => {
            return (
                <SuggestionItem
                    location={l}
                    intersection={l.Categories.filter(x =>
                        categories.includes(x)
                    )}
                    handleItemSelect={this.handleItemSelect.bind(this)}
                    // handleGemClick={this.handleGemClick.bind(this)}
                />
            )
        })
        const savedItems = savedLocations.map(l => {
            return (
                <CollectionItem
                    location={l}
                    intersection={l.Categories.filter(x =>
                        categories.includes(x)
                    )}
                    handleItemSelect={this.handleItemSelect.bind(this)}
                />
            )
        })
        return (
            <View style={styles.container}>
                <Text style={styles.topHeader}>{name}</Text>
                <View style={styles.collectionsContainer}>
                    <Text style={styles.header}>From Collection</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.collectionsScroll}>
                            {savedItems}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.suggestionsContainer}>
                    <Text style={styles.header}>More Suggestions...</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.collectionsScroll}>
                            {suggestedItems}
                        </View>
                    </ScrollView>
                </View>
                <TouchableWithoutFeedback onPress={() => this.handleCreate()}>
                    <View style={styles.createBtn}>
                        <Text style={styles.createBtnText}>
                            Save and View Trip
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

class CollectionItem extends React.Component {
    render() {
        const { location, intersection } = this.props
        let reason = intersection[0]
        if (intersection[1]) {
            reason = reason + ' & ' + intersection[1]
        }
        // intersection.forEach(r => reason = reason + r + ", ")
        // reason = reason.substring(0, reason.length - 2)
        reason = "80% who liked " + reason + " liked this"
        return (
            <View style={styles.colItem}>
                <Image style={{width: 180, height: 120}}
                       source={images[location.id]}/>
                <View style={styles.colItemHeader}>
                    <Text style={styles.colItemHeaderText}>
                        {location.name}
                    </Text>
                    <Text style={styles.colItemSubHeader}>{reason}</Text>
                </View>
                {!location.selected &&
                <TouchableWithoutFeedback onPress={() => this.props.handleItemSelect(location.name)}>
                    <View style={styles.colAddBtn}>
                        <Text style={styles.colAddBtnText}>Add to Itinerary</Text>
                    </View>
                </TouchableWithoutFeedback>}
                {location.selected &&
                <TouchableWithoutFeedback onPress={() => this.props.handleItemSelect(location.name)}>
                    <View style={styles.colAddedBtn}>
                        <Text style={styles.colAddedBtnText}>Added</Text>
                    </View>
                </TouchableWithoutFeedback>}
            </View>
        )
    }
}

class SuggestionItem extends React.Component {
    render() {
        const { location, intersection } = this.props
        let reason = intersection[0]
        if (intersection[1]) {
            reason = reason + ' & ' + intersection[1]
        }
        // intersection.forEach(r => reason = reason + r + ", ")
        // reason = reason.substring(0, reason.length - 2)
        reason = "80% who liked " + reason + " liked this"
        return (
            <View style={styles.colItem}>
                <Image style={{width: 180, height: 120}}
                       source={images[location.id]}/>
                <View style={styles.sugItemHeader}>
                    <Text style={styles.sugItemHeaderText}>
                        {location.name}
                    </Text>
                    <Text style={styles.sugItemSubHeader}>{reason}</Text>
                </View>
                {!location.selected &&
                <TouchableWithoutFeedback onPress={() => this.props.handleItemSelect(location.name)}>
                    <View style={styles.colAddBtn}>
                        <Text style={styles.colAddBtnText}>Add to Trip</Text>
                    </View>
                </TouchableWithoutFeedback>}
                {location.selected &&
                <TouchableWithoutFeedback onPress={() => this.props.handleItemSelect(location.name)}>
                    <View style={styles.colAddedBtn}>
                        <Text style={styles.colAddedBtnText}>Added</Text>
                    </View>
                </TouchableWithoutFeedback>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        paddingVertical: 5
    },
    topHeader: {
        flex: 0,
        fontSize: 30,
        fontWeight: "bold",
        color: '#1EA28A',
        margin: 20,
        paddingBottom: 0
    },
    header: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5
    },
    collectionsContainer: {
        flex: 5,
    },
    collectionsScroll: {
        flexDirection: "row",
        flex: 0
    },
    suggestionsContainer: {
        flex: 5,
        borderTopWidth: 1,
        borderColor: "#DADADA"
    },
    colItem: {
        height: 200,
        width: 180,
        margin: 5
    },
    colItemHeader: {
        height: 60,
        backgroundColor: "#1EA28A",
        padding: 5,
    },
    colItemHeaderText: {
        fontSize: 15,
        color: "white"
    },
    sugItemSubHeader:{
        fontSize: 10,
    },
    colItemSubHeader:{
        fontSize: 10,
        color: "white"
    },
    sugItemHeader: {
        height: 60,
        backgroundColor: "#DADADA",
        padding: 5,
    },
    sugItemHeaderText: {
        fontSize: 15
    },
    colAddBtn: {
        height: 30,
        width: 100,
        borderRadius: 15,
        marginHorizontal: 40,
        marginTop: -15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1
    },
    colAddedBtn: {
        height: 30,
        width: 100,
        borderRadius: 15,
        marginHorizontal: 40,
        marginTop: -15,
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#fff',
        backgroundColor: "#1EA28A",
        borderWidth: 1
    },
    colAddBtnText: {
        fontSize: 12,
        textAlign: "center"
    },
    colAddedBtnText: {
        fontSize: 12,
        color: '#fff',
        textAlign: "center"
    },
    createBtn: {
        backgroundColor: "#1EA28A",
        width: 200,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createBtnText: {
        color: "white",
        fontSize: 20,
        textAlign: "center"
    }
})
