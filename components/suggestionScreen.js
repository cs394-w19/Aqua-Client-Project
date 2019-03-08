import React from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    WebView,
    TouchableWithoutFeedback
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
            user: null
        }
    }

    _onLoadEnd() {
        this.setState({webviewLoaded: true})
    }


    componentDidMount = () => {
        const db = this.props.db
        const user = this.props.user
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
        this.setState({blogVisible: true, link: link})
    }

    handleItemSelect = name => {
        const {navigate} = this.props.navigation
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
        const categories = this.state.categories
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
                    EXPLORE
                </Text>
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
                                    Back to Suggestion List
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
        margin: 20,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        color: '#1EA28A',
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
        height: 60,
        alignItems: "center",
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

export default withNavigationFocus(SuggestionScreen);