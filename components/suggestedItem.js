import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import CheckBox from './checkBox';

let images = [];
images[0] = require("../assets/locationPictures/0.jpg");
images[1] = require("../assets/locationPictures/1.jpg");
images[2] = require("../assets/locationPictures/2.jpg");
images[3] = require("../assets/locationPictures/3.jpg");
images[4] = require("../assets/locationPictures/4.jpg");
images[5] = require("../assets/locationPictures/5.jpg");
images[6] = require("../assets/locationPictures/6.jpg");
images[7] = require("../assets/locationPictures/7.jpg");
images[8] = require("../assets/locationPictures/8.jpg");
images[9] = require("../assets/locationPictures/9.jpg");
images[10] = require("../assets/locationPictures/10.jpg");
images[11] = require("../assets/locationPictures/11.jpg");
images[12] = require("../assets/locationPictures/12.jpg");
images[13] = require("../assets/locationPictures/13.jpg");
images[14] = require("../assets/locationPictures/14.jpg");
images[15] = require("../assets/locationPictures/15.jpg");
images[16] = require("../assets/locationPictures/16.jpg");
images[17] = require("../assets/locationPictures/17.jpg");
const gem = require("../assets/diamond.png")

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
        if (intersection[1]) {
            reason = reason + ' & ' + intersection[1]
        }
        // intersection.forEach(r => reason = reason + r + ", ")
        // reason = reason.substring(0, reason.length - 2)
        reason = "80% who liked " + reason + " liked this"
        const containerClick = location.gem ? handleGemClick : () => {
        }
        return (
            <TouchableWithoutFeedback onPress={() => containerClick(location.link)}>
                <View style={styles.container}>
                    <Image source={images[location.id]} style={{height: 250, width: 350}}/>
                    <View style={styles.details}>
                        <View style={styles.textDetails}>
                            <Text style={styles.text}>{location.name}</Text>
                            <Text style={styles.reason}>{reason}</Text>
                            {location.gem && <Text style={styles.suggestedBy}>Suggested By {location.website}</Text>}
                        </View>
                        {location.gem && <Image source={gem}
                                                style={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    top: 5,
                                                    height: 30,
                                                    width: 30,
                                                    rotate: '30deg'
                                                }}/>
                        }

                    </View>

                    <View style={styles.checkbox}>
                        <CheckBox checked={location.selected} gem={location.gem}
                                  handleCheckBoxClick={() => handleItemSelect(location.name)}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
            ;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#1EA28A88',
        borderRadius: 10,
        borderWidth: 10,
        borderColor: '#1EA28A88',
        width: 370,
        shadowColor: 'black',
        shadowRadius: 5,
        margin: 10,
    },
    containerGem: {
        flex: 0,
        backgroundColor: "#1EA28A88",
        alignItems: 'center'
    },
    checkbox: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    details: {
        height: 100
    },
    textDetails: {
        flexDirection: 'column',
        width: 300
    },
    text: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 10,
    },
    reason: {
        fontSize: 15,
        marginLeft: 10,
        color: "#1EA28A"
    },
    suggestedBy: {
        fontSize: 10,
        marginLeft: 10,
        color: "#fff",
    },
})