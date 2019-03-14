import React from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    WebView,
    TouchableWithoutFeedback,
    TextInput
} from "react-native"
import SuggestedItem from "./suggestedItem"
import Suggestions from "../suggestions.json"
import profileQuestions from "../profileQuestions.json";
import {withNavigationFocus} from "react-navigation"

class SuggestionScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            categories: [],
            savedLocations: [],
            blogVisible: false,
            blogLink: null,
            webviewLoaded: false,
            db: null,
            user: null,
            chosenLoc: ""
        }
    }

    _onLoadEnd() {
        this.setState({webviewLoaded: true})
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    componentDidMount = () => {
        const { db, user } = this.props
        let userPreferences = {}
        let categories = []
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            db.collection("users")
                .doc(user)
                .get()
                .then(userData => {
                    userPreferences = userData.data()["preferences"] ? userData.data()["preferences"] : [];
                    let userSavedLocations = userData.data()["savedLocations"] ? userData.data()["savedLocations"] : [];

                    profileQuestions.questions.forEach(q =>
                        q.options.forEach(o => {
                            if (userPreferences[q.text].find(option => option === o.name)) {
                                categories = categories.concat(o.Categories)
                            }
                        })
                    )
                    let suggestions = this.retrieveSuggestions(categories)
                    suggestions = suggestions.filter(s => (userSavedLocations.find(l => l.name === s.name) === undefined))
                    suggestions.forEach(a => (a.selected = false))
                    this.setState({
                        suggestions: suggestions,
                        categories: categories,
                        savedLocations: userSavedLocations,
                        blogVisible: false,
                        user: user,
                        db: db
                    })
                })
        })
    }


    retrieveSuggestions(categories) {
        let foundAttractions = []
        for (var i = 0; i < Suggestions.Locations.length; i++) {
            foundAttractions = foundAttractions.concat(Suggestions.Locations[i].Attractions.filter(
                    a => {
                        let intersection = a.Categories.filter(x =>
                            categories.includes(x)
                        )
                        if (intersection.length > 0) {
                            return true
                        } else return false
                    }
                )
            )
        }
        let foundRestaurants = []
        for (var i = 0; i < Suggestions.Locations.length; i++) {
            foundRestaurants = foundRestaurants.concat(Suggestions.Locations[i].Restaurants.filter(
                r => {
                    let intersection = r.Categories.filter(x =>
                        categories.includes(x)
                    )
                    if (intersection.length > 0) {
                        return true
                    } else return false
                }
                )
            )
        }
        foundAttractions = foundAttractions.concat(foundRestaurants)
        return this.shuffle(foundAttractions);
    }

    handleGemClick = link => {
        this.setState({blogVisible: true, link: link})
    }

    handleItemSelect = name => {
        const state = this.state
        const { db, user } = state
        const suggestion = state.suggestions.find(s => s.name === name)
        let savedLocations = this.state.savedLocations
        suggestion.selected = !suggestion.selected
        this.setState(state)
        if (suggestion.selected) {
            savedLocations.push(suggestion)
            db.collection("users")
                .doc(user).set({
                savedLocations: savedLocations
            }, {merge: true}).then(
                this.setState({
                    savedLocations: savedLocations
                })
            )
        } else {
            savedLocations.splice(savedLocations.indexOf(savedLocations.find(l => l.name == suggestion.name)), 1)
            db.collection("users")
                .doc(user).set({
                savedLocations: savedLocations
            }, {merge: true}).then(
                this.setState({
                    savedLocations: savedLocations
                })
            )
        }
    }

    render() {
        const { categories, suggestions, chosenLoc } = this.state
        const suggestedItems = suggestions.map(l => {
            return (
                <SuggestedItem
                    location={l}
                    intersection={l.Categories.filter(x =>
                        categories.includes(x)
                    )}
                    handleItemSelect={this.handleItemSelect.bind(this)}
                    handleGemClick={this.handleGemClick.bind(this)}
                />
            )
        })
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    EXPLORE
                </Text>
                <Text style={styles.headerSubtitle}>
                    Recommendations Based on your Profile
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Whare Are You Travelling?"
                    value={chosenLoc}
                    onChangeText={(text) => { this.setState({ chosenLoc: text }) }}
                />
                <ScrollView style={{flex: 1}}>
                    <View style={styles.suggestionsContainer}>
                        {suggestedItems}
                    </View>
                </ScrollView>
                {this.state.blogVisible && (
                    <View style={styles.webContainer}>
                        <WebView
                            useWebKit={true}
                            onLoad={this._onLoadEnd.bind(this)}
                            source={{uri: this.state.link}}
                            style={styles.webView}
                        />
                        <TouchableWithoutFeedback
                            title="close"
                            onPress={() => {
                                this.setState({
                                    blogVisible: false,
                                    webviewLoaded: false
                                })
                            }}
                        >
                            <View style={styles.closeBtn}>
                                <Text style={styles.closeBtnText}>
                                    X
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    header: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        color: '#1EA28A',
    },
    suggestionsContainer: {
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    webView: {
        margin: 10
    },
    webContainer: {
        height: 400,
        width: 350,
        borderRadius: 10,
        borderColor: "#1EA28A",
        borderWidth: 5,
        position: "absolute",
        alignSelf: "center",
        top: 50,
        backgroundColor: "#fff"
    },
    closeBtn: {
        display: "flex",
        backgroundColor: "#1EA28A",
        height: 40,
        width: 40,
        borderRadius: 5,
        alignItems: "center",
        position: "absolute",
        top: 20,
        right: 20,
        justifyContent: "center"
    },
    closeBtnText: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center"
    },
    itineraryBtn: {
        width: 150,
        height: 50,
        backgroundColor: "#1EA28A",
        borderRadius: 25,
        marginVertical: 30,
        marginRight: 30,
        marginLeft: "auto",
        alignItems: "center"
    },
    itineraryBtnText: {
        color: "white",
        fontSize: 20,
        textAlign: "center"
    },
    headerSubtitle: {
        textAlign: 'center',
        fontSize: 15,
        color: 'darkgrey',
    },
    textInput: {
        fontSize: 20,
        borderWidth: 2,
        width: 250,
        height: 40,
        padding: 5,
        borderColor: 'darkgrey',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    }
})

export default withNavigationFocus(SuggestionScreen);