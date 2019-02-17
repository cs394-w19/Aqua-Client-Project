import React from 'react';
import {Button, StyleSheet, Text, View,TouchableWithoutFeedback,ScrollView} from 'react-native';
import questions from '../questions.json';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {questions: questions.questions};
        this.handleOptionClick = this.handleOptionClick.bind(this); 

        // let options = state.questions.map(q => {q.options.map(o => o ={o: false})})

    }
    handleOptionClick = (o,q) => {
        
        const state= this.state 
        let question = state.questions.find(q2 =>q2.text === q.text).options.find(o2 => o2.name === o.name)
        question.status = !question.status
        this.setState(state)        

    }
    render() {
        const {navigate} = this.props.navigation;
        const questionItems = this.state.questions.map( q => {
            const questionOptions = q.options.map(o => {
                let buttonStyle
                if (this.state.questions.find(q2 =>q2.text === q.text).options.find(o2 => o2.name === o.name).status){
                    buttonStyle = styles.buttonClicked
                }
                else{
                    buttonStyle = styles.button
                }

                return(
                <TouchableWithoutFeedback title={o.name} 
                    onPress= {()=> {
                    this.handleOptionClick(o,q)}} >
                    <View style= {buttonStyle}>                    
                    <Text>
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
        return (
            <ScrollView style={styles.container}>
                {questionItems}
                <Button title="Submit Button"onPress={() => navigate("SuggestionScreen",{state: this.state})} style= {styles.button}>
                    Submit
                </Button>
            </ScrollView>
        );
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
    optionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        flexWrap: "wrap",
    },
    buttonClicked: {
        width: 75,
        height: 75,
        backgroundColor: 'blue',
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center',

    }
});