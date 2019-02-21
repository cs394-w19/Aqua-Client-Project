import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from './checkBox';

export default class SuggestedItem extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    handleCheckBoxClick = () => {
        this.setState({checked: !this.state.checked})
    }

    render() {
        const {Location} = this.props
        const location = Location.name
        // const rationale = this.props.intersection;
        // const reason = ""
        // rationale.forEach(r=> reason + r + " & ")
        // reason.substring(0, -2)
        const {intersection} = this.props
        

        return (
            <View style={styles.container}>
                <CheckBox checked={this.state.checked} handleCheckBoxClick={this.handleCheckBoxClick.bind(this)}/>
                <Text style={styles.text}>{location}</Text>
                <Text style={styles.reco_text}>Why Recommended: {intersection}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        paddingHorizontal: 40
    },
    text: {
        fontSize: 20,
        padding: 10,
        marginLeft: 20
    },
    reco_text: {
        fontSize: 10,
        padding: 10,
        marginLeft: 20
    },
})