import React from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    WebView,
    TouchableWithoutFeedback
} from "react-native"
import SuggestedItem from "./suggestedItem"
import Suggestions from "../suggestions.json"
import profileQuestions from "../profileQuestions.json";

export default class SuggestionScreen extends React.Component {
    static navigationOptions = {
        title: 'Itinerary',
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
            suggestions: [],
            categories: [],
            savedLocations: [],
            blogVisible: false,
            blogLink: null,
            webviewLoaded: false,
            db: null,
            user: null
        }
    }

    _onLoadEnd() {
        this.setState({ webviewLoaded: true })
    }

    componentDidMount = () => {
        const { navigate } = this.props.navigation
        const { state } = this.props.navigation
        const db = this.props.db
        const user = this.props.user
        let userPreferences = {}
        let categories = []
        db.collection("users")
            .doc(user)
            .get()
            .then(userData => {
                userPreferences = userData.data()["preferences"]
                let userSavedLocations = userData.data()["savedLocations"]

                profileQuestions.questions.forEach(q =>
                    q.options.forEach(o => {
                        if (userPreferences[q.text].find(option => option === o.name)) {
                            categories = categories.concat(o.Categories)
                        }
                    })
                )   
                const suggestions = this.retrieveSuggestions(categories)
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

    handleGemClick = link => {
        this.setState({ blogVisible: true, link: link })
    }

    handleItemSelect = name => {
        const { navigate } = this.props.navigation
        const state = this.state
        const db = this.state.db
        const user = this.state.user
        const suggestion = state.suggestions.find(s => s.name === name)
        let savedLocations = this.state.savedLocations
    
        suggestion.selected = !suggestion.selected
        this.setState(state)

        if (suggestion.selected) {
            savedLocations.push(suggestion)
            db.collection("users")
                .doc(user).set({
                    savedLocations: savedLocations
                }, { merge: true }).then(
                    this.setState({
                        savedLocations: savedLocations
                    })
                )
            } else {
            savedLocations.splice(savedLocations.indexOf(savedLocations.find(l => l.name == suggestion.name)), 1)
            db.collection("users")
                .doc(user).set({
                    savedLocations: savedLocations
                }, { merge: true }).then(
                    this.setState({
                        savedLocations: savedLocations
                    })
                )
            }
        }

    render() {
        const categories = this.state.categories
        const { navigate } = this.props.navigation
        const suggestions = this.state.suggestions
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
                    Based on your profile, you may enjoy these sites in Paris...
                </Text>
                <View style={styles.suggestionsContainer}>
                    <ScrollView>{suggestedItems}</ScrollView>
                    <TouchableWithoutFeedback
                        onPress={() =>
                            navigate("ItineraryScreen", {
                                suggestions: this.state.suggestions.filter(
                                    s => s.selected
                                )
                            })
                        }
                    >
                        <View style={styles.itineraryBtn}>
                            <Text style={styles.itineraryBtnText}>
                                View Saved Locations
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.blogVisible && (
                    <View style={styles.webContainer}>
                        <WebView
                            useWebKit={true}
                            onLoad={this._onLoadEnd.bind(this)}
                            source={{ uri: this.state.link }}
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
        backgroundColor: "#fff"
    },
    header: {
        flex: 0,
        padding: 20,
        fontSize: 30,
        paddingBottom: 0
    },
    subHeader: {
        flex: 0,
        padding: 20,
        fontSize: 15
    },
    suggestionsContainer: {
        marginTop: 20,
        flex: 1,
        flexDirection: "column"
    },
    webView: {
        margin: 10
    },
    webContainer: {
        height: 500,
        width: 400,
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
    }
})
