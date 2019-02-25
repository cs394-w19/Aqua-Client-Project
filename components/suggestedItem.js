import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import CheckBox from './checkBox';

export default class SuggestedItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }


    render() {
        const {location, intersection, handleItemSelect, handleGemClick} = this.props;
        let reason = ""
        intersection.forEach(r=> reason = reason + r + " | ")
        reason = reason.substring(0, reason.length-3)
        const containerStyle = location.gem ? styles.containerGem : styles.container
        const containerClick = location.gem ? handleGemClick : ()=>{}
        return (
            <View style={containerStyle}>
                <CheckBox checked={location.selected} handleCheckBoxClick={()=>handleItemSelect(location.name)}/>
                <TouchableWithoutFeedback onPress={()=>containerClick(location.link)}>
                    <View style={styles.details}>
                    <Text style={styles.text}>{location.name}</Text>
                    <Text style={styles.reason}>{reason}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    containerGem: {
        height: 70,
        backgroundColor: "#FF9A73",
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        alignItems: 'center'
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