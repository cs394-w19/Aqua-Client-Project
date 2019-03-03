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
        let reason = intersection[0]
        if (intersection[1]){
            reason = reason + ' & ' + intersection[1]
        }
        // intersection.forEach(r => reason = reason + r + ", ")
        // reason = reason.substring(0, reason.length - 2)
        reason = "80% who liked " + reason + " liked this"
        const containerStyle = location.gem ? styles.containerGem : styles.container
        const containerClick = location.gem ? handleGemClick : () => {
        }
        const reasonStyle = location.gem ? styles.reasonGem : styles.reason
        return (
            <View style={containerStyle}>
                {location.gem && <Text style={styles.suggestedBy}>Suggested By {location.website}</Text>}
                <CheckBox checked={location.selected} gem={location.gem}
                          handleCheckBoxClick={() => handleItemSelect(location.name)}/>
                <TouchableWithoutFeedback onPress={() => containerClick(location.link)}>
                    <View style={styles.details}>
                        <Text style={styles.text} numberOfLines={1}>{location.name}</Text>
                        <Text style={reasonStyle}>{reason}</Text>
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
        backgroundColor: "#1EA28A88",
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    details: {
        flexDirection: 'column',
        width: 250
    },
    text: {
        fontSize: 15,
        marginTop: 5,
        marginLeft: 20,
    },
    reason: {
        fontSize: 10,
        marginLeft: 20,
        color: "#1EA28A",
        flex: 0
    },
    reasonGem: {
        fontSize: 10,
        marginLeft: 20,
        color: "#fff",
        flex: 0
    },
    suggestedBy: {
        fontSize: 10,
        marginLeft: 20,
        color: "#fff",
        position: 'absolute',
        top: 0,
        right: 5
    },
})