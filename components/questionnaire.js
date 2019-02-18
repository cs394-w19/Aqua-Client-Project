import React from 'react';
import {Button, StyleSheet, Text, View,TouchableWithoutFeedback,ScrollView} from 'react-native';
import questions from '../questions.json';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: questions.questions,
            index: 0,
            finalIndex: 1,
            completed: false
        };
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);

        // let options = state.questions.map(q => {q.options.map(o => o ={o: false})})

    }
    handleOptionClick = (o,q) => {
        const state= this.state 
        let question = state.questions.find(q2 =>q2.text === q.text).options.find(o2 => o2.name === o.name)
        question.status = !question.status
        this.setState(state)        

    }

    handleSubmitClick = () => {
        const {navigate} = this.props.navigation;
        const index = this.state.index;
        if(index === this.state.finalIndex) {
            navigate("SuggestionScreen", {state: this.state})
            this.setState({completed: true})
        }
        else {
            this.setState({index: (index + 1)})
        }
    }

    render() {
        console.log("INDEX" + this.state.index)

        const questionItems = this.state.questions.map( q => {
            const questionOptions = q.options.map(o => {
                let buttonStyle
                let buttonTextStyle
                if (this.state.questions.find(q2 =>q2.text === q.text).options.find(o2 => o2.name === o.name).status){
                    buttonStyle = styles.buttonClicked
                    buttonTextStyle = styles.buttonClickedText
                }
                else{
                    buttonStyle = styles.button
                    buttonTextStyle = styles.buttonText

                }

                return(
                <TouchableWithoutFeedback title={o.name} 
                    onPress= {()=> {
                    this.handleOptionClick(o,q)}} >
                    <View style= {buttonStyle}>                    
                    <Text style={buttonTextStyle}>
                        {o.name}
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
            })
            return <View>
                <Text> {q.text}</Text>
                <View style= {styles.optionContainer}>
                    {questionOptions}
                </View>
            </View>
        });
        if(!this.state.completed) {
            return (
                <ScrollView style={styles.container}>
                    {questionItems[this.state.index]}
                    <Button title="Submit Button" onPress={this.handleSubmitClick} style={styles.button}>
                        Submit
                    </Button>
                </ScrollView>
            );
        }
        else{
            return (
                <ScrollView style={styles.container}>
                    {questionItems}
                    <Button title="Submit Button" onPress={this.handleSubmitClick} style={styles.button}>
                        Submit
                    </Button>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    button: {
        width: 75,
        height: 75,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    buttonText: {
        fontWeight: "600",
        color:"black"
    },

    optionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        flexWrap: "wrap",
    },
    buttonClicked: {
        color: "white",
        width: 75,
        height: 75,
        backgroundColor: 'green',
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonClickedText: {
        fontWeight: "600",
        color:"white"
    }
});