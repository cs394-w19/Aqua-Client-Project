import React from 'react';
import {Button, StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView} from 'react-native';
import questions from '../tripQuestions.json';
import profileQuestions from "../profileQuestions.json";


export default class App extends React.Component {
    static navigationOptions = {
        title: 'Trip Options',
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
            questions: questions.tripQuestions,
            index: 0,
            finalIndex: 3,
            completed: false
        };
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);


    }

    handleOptionClick = (o, q) => {
        const state = this.state
        let option = state.questions.find(q2 => q2.text === q.text).options.find(o2 => o2.name === o.name)
        option.status = !option.status
        this.setState(state)

    }

    handleNextClick = () => {
        const {navigate} = this.props.navigation;
        const {state} = this.props.navigation;
        const db = this.props.db;
        const user = this.props.user;
        const questions = this.state.questions
        let FilteredCategories = []
        for (var i = 0; i < questions.length; i++) {
            let question = questions[i]
            for (var j = 0; j < question.options.length; j++) {
                let option = question.options[j]
                if (option.status) {
                    for (var k = 0; k < option.Categories.length; k++) {
                        if (!FilteredCategories.includes(option.Categories[k])) {
                            FilteredCategories.push(option.Categories[k])
                        }
                    }
                }
            }
        }
        const index = this.state.index;
        if (index === this.state.finalIndex) {
            db.collection("users").doc(user).get().then((res) => {
                const data = res.data().preferences;
                let categories = []
                profileQuestions.questions.forEach(q =>
                    q.options.forEach(o => {
                        if (data[q.text].find(option => option === o.name)) {
                            categories = categories.concat(o.Categories)
                        }
                    })
                )
            FilteredCategories = FilteredCategories.concat(categories)
            this.setState({completed: true})
            navigate("SuggestionScreen")
        }
    );

}
else
{
    this.setState({index: (index + 1)})
}
}

handlePreviousClick = () => {
    const {navigate} = this.props.navigation;
    const index = this.state.index;
    if (index === 0) {
        navigate("Homepage")
    } else {
        this.setState({index: (index - 1)})
    }
}

render()
{
    const questionItems = this.state.questions.map(q => {
        const questionOptions = q.options.map(o => {
            let buttonStyle
            let buttonTextStyle
            if (this.state.questions.find(q2 => q2.text === q.text).options.find(o2 => o2.name === o.name).status) {
                buttonStyle = styles.buttonClicked
                buttonTextStyle = styles.buttonClickedText
            } else {
                buttonStyle = styles.button
                buttonTextStyle = styles.buttonText
            }

            return (
                <TouchableWithoutFeedback title={o.name}
                                          onPress={() => {
                                              this.handleOptionClick(o, q)
                                          }}>
                    <View style={buttonStyle}>
                        <Text style={buttonTextStyle}>
                            {o.name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
        return <View>
            <Text style={styles.questionText}> {q.text}</Text>
            <View style={styles.optionContainer}>
                {questionOptions}
            </View>
        </View>
    });
    if (!this.state.completed) {
        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    {questionItems[this.state.index]}
                </View>
                <TouchableWithoutFeedback title="Previous Button" onPress={this.handlePreviousClick}>
                    <View style={styles.previousButton}><Text style={styles.submitText}>Previous</Text></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback title="Next Button" onPress={this.handleNextClick}>
                    <View style={styles.nextButton}><Text style={styles.submitText}>Next</Text></View>
                </TouchableWithoutFeedback>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.questionContainer}>
                        {questionItems}
                    </View>
                </ScrollView>
                <TouchableWithoutFeedback title="Next Button" onPress={this.handleNextClick}>
                    <View style={styles.nextButton}><Text style={styles.submitText}>Next</Text></View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column",
        padding: 20,
    },
    questionContainer: {
        flex: 0,
        paddingBottom: 150,
    },
    questionText: {
        fontSize: 30,
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#1EA28A",
        alignItems: 'center',
        justifyContent: 'center',


    },
    buttonText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "black"
    },

    optionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        flexWrap: "wrap",
    },
    buttonClicked: {
        color: "white",
        width: 100,
        height: 100,
        backgroundColor: "#1EA28A",
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#1EA28A",
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonClickedText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "white"
    },
    nextButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        position: "absolute",
        right: 30,
        bottom: 50
    },
    previousButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        position: "absolute",
        left: 30,
        bottom: 50
    },
    submitText: {
        fontSize: 20,
        height: 40,
        textAlign: "center",
        paddingVertical: 5
    }
});