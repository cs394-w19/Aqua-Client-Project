import React from 'react';
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import questions from '../profileQuestions.json';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: questions.questions,
            index: 0,
            finalIndex: 6,
            completed: false
        };
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    handleNextClick = () => {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        const db = state.params.db;
        const user = state.params.user;
        const questions = this.state.questions
        const FilteredCategories = {}
        for (var i = 0; i < questions.length; i++) {
            let question = questions[i]
            FilteredCategories[questions[i].text] = []
            for (var j = 0; j < question.options.length; j++) {
                let option = question.options[j]
                if (option.status) {
                    if (!FilteredCategories[question.text].includes(option.name)) {
                        FilteredCategories[question.text].push(option.name)
                    }
                }
            }
        }
        const index = this.state.index;
        if (index === this.state.finalIndex) {
            db.collection("users").doc(user).set({ preferences: FilteredCategories }).then(res => {
                console.log("Document successfully written!")
            });
            navigate("Homepage", {db: db, user: user})

        } else {
            this.setState({ index: (index + 1) })
        }
    }

    handlePreviousClick = () => {
        const { navigate } = this.props.navigation;
        const index = this.state.index;
        if (index === 0) {
            navigate("Homepage")
        } else {
            this.setState({ index: (index - 1) })
        }
    }

    handleOptionClick = (o, q) => {
        const state = this.state
        let option = state.questions.find(q2 => q2.text === q.text).options.find(o2 => o2.name === o.name)
        option.status = !option.status
        this.setState(state)

    }

    // handleSubmitClick = () => {
    //     const { navigate } = this.props.navigation;
    //     const { state } = this.props.navigation;
    //     const db = state.params.db;
    //     const user = state.params.user;
    //     console.log(user);

    //     const questions = this.state.questions
    //     const FilteredCategories = {}
    //     for (var i = 0; i < questions.length; i++) {
    //         let question = questions[i]
    //         FilteredCategories[questions[i].text] = []
    //         for (var j = 0; j < question.options.length; j++) {
    //             let option = question.options[j]
    //             if (option.status) {
    //                 if (!FilteredCategories[question.text].includes(option.name)) {
    //                     FilteredCategories[question.text].push(option.name)
    //                 }
    //             }
    //         }
    //     }
    //     console.log(FilteredCategories)
    //     db.collection("users").doc(user).set({ preferences: FilteredCategories }).then(res => {
    //         console.log("Document successfully written!")
    //     });
    //     navigate("Homepage")
    //     // this.setState({ completed: true })
    // }

    render() {
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
        borderColor: "#FF9A73",
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
        backgroundColor: "#FF9A73",
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#FF9A73",
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonClickedText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "white"
    },
    submitButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        bottom: 50,
        marginHorizontal: "auto"
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