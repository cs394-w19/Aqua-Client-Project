import React from "react"
import {
    Button,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native"
import Suggestions from "../suggestions.json"
import profileQuestions from "../profileQuestions.json"

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

export default class newItinerary extends React.Component {
    static navigationOptions = {
        title: "New Itinerary",
        headerTitleStyle: {
            marginRight: 56,
            color: "#1EA28A",
            textAlign: "center",
            flex: 1,
            fontSize: 20
        }
    }

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
                suggestions.forEach(s => (s.selected = false))
                userSavedLocations.forEach(l => (l.selected = false))
                this.setState({
                    suggestions: suggestions,
                    categories: categories,
                    savedLocations: userSavedLocations,
                    blogVisible: false,
                    user: user,
                    db: db,
                    itineraryId: itineraryId
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
            .set({ locations: itineraryItems }, { merge: true })
            .then(rev => {
                console.log("wrote itinerary")
            })

        navigate("Itinerary", {
            db: db,
            user: user,
            itineraryId: itineraryId
        })
    }

    render() {
        const { categories, suggestions, savedLocations } = this.state
        const suggestedItems = suggestions.map(l => {
            return (
                <CollectionItem
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
                <View style={styles.collectionsContainer}>
                    <Text style={styles.header}>From your Collection</Text>
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
                            Create Itinerary
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
        return (
            <View style={styles.colItem}>
                <View style={styles.colItemHeader}>
                    <Text style={styles.colItemHeaderText}>
                        {location.name}
                    </Text>
                </View>
                <Image
                    style={{
                        width: 200,
                        height: 170,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                    }}
                    source={images[location.id]}
                />
                {!location.selected && (
                    <TouchableWithoutFeedback
                        onPress={() =>
                            this.props.handleItemSelect(location.name)
                        }
                    >
                        <View style={styles.colAddBtn}>
                            <Text style={styles.colAddBtnText}>
                                Add to Itinerary
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                {location.selected && (
                    <TouchableWithoutFeedback
                        onPress={() =>
                            this.props.handleItemSelect(location.name)
                        }
                    >
                        <View style={styles.colAddedBtn}>
                            <Text style={styles.colAddBtnText}>Added</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    header: {
        color: "white",
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5
    },
    collectionsContainer: {
        flex: 5,
        backgroundColor: "#1EA28Acc"
    },
    collectionsScroll: {
        flexDirection: "row",
        flex: 0
    },
    suggestionsContainer: {
        flex: 5,
        backgroundColor: "#555555cc"
    },
    colItem: {
        height: 230,
        width: 208,
        backgroundColor: "#000",
        borderWidth: 4,
        margin: 10,
        borderRadius: 10
    },
    colItemHeader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    colItemHeaderText: {
        fontSize: 20,
        color: "white",
        textAlign: "center"
    },
    colAddBtn: {
        height: 40,
        width: 200,
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffffcc",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    colAddedBtn: {
        height: 40,
        width: 200,
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1EA28Acc",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    colAddBtnText: {
        fontSize: 20,
        textAlign: "center"
    },
    createBtn: {
        backgroundColor: "black",
        flex: 1
    },
    createBtnText: {
        color: "white",
        fontSize: 20,
        textAlign: "center"
    }
})
