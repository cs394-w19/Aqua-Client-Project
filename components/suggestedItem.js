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
        const {location, intersection} = this.props;
        let reason = ""
        intersection.forEach(r=> reason = reason + r + " | ")
        reason = reason.substring(0, reason.length-3)
        return (
            <View style={styles.container}>
                <CheckBox checked={this.state.checked} handleCheckBoxClick={this.handleCheckBoxClick.bind(this)}/>
                <View style={styles.details}>
                    <Text style={styles.text}>{location.name}</Text>
                    <Text style={styles.reason}>{reason}</Text>
                </View>
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
    details:{
        flexDirection: 'column',
    },
    text: {
        fontSize: 20,
        marginLeft: 20,
        flex: 0
    },
    reason: {
        fontSize: 10,
        marginLeft: 20,
        color: "#FF9A73",
        flex: 0
    },
})