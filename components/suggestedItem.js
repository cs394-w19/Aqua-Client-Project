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
images[18] = require("../assets/locationPictures/18.jpg");
images[19] = require("../assets/locationPictures/19.jpg");
images[20] = require("../assets/locationPictures/20.jpg");
images[21] = require("../assets/locationPictures/21.jpg");
images[22] = require("../assets/locationPictures/22.jpg");
images[23] = require("../assets/locationPictures/23.jpg");
images[24] = require("../assets/locationPictures/24.jpg");
images[25] = require("../assets/locationPictures/25.jpg");
images[26] = require("../assets/locationPictures/26.jpg");
images[27] = require("../assets/locationPictures/27.jpeg");
images[28] = require("../assets/locationPictures/28.jpg");
images[29] = require("../assets/locationPictures/29.jpg");
images[30] = require("../assets/locationPictures/30.jpeg");

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
        const containerStyle = this.state.checked ? styles.containerSelected : styles.container
        const textStyle=this.state.checked ? styles.textSelected: styles.text;
        const reasonStyle= this.state.checked ? styles.reasonSelected : styles.reason;
        const suggestedByStlye= this.state.checked ? styles.suggestedBySelected : styles.suggestedBy;
        return (
            <TouchableWithoutFeedback onPress={() => containerClick(location.link)}>
                <View style={containerStyle}>
                    <Image source={images[location.id]} style={{height: 120, width: 180}}/>
                    <View style={styles.details}>
                        <View style={styles.textDetails}>
                            <Text style={textStyle}>{location.name}</Text>
                            <Text style={reasonStyle}>{reason}</Text>
                            {location.gem && <Text style={suggestedByStlye}>Suggested By {location.website}</Text>}
                        </View>
                    </View>
                    {location.gem && <Image source={gem}
                                            style={{
                                                position: 'absolute',
                                                left: 10,
                                                top: 10,
                                                height: 30,
                                                width: 30,
                                            }}/>
                    }
                    <View style={styles.checkbox}>
                        <CheckBox checked={location.selected} gem={location.gem}
                                  handleCheckBoxClick={() => {
                                      this.setState({checked: !this.state.checked})
                                      handleItemSelect(location.name)
                                  }}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
            ;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DADADAcc',
        height: 220,
        width: 180,
        marginVertical: 5
    },
    containerSelected: {
        backgroundColor: '#1EA28A',
        height: 220,
        width: 180,
        marginVertical: 5
    },
    checkbox: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    details: {
        height: 100
    },
    textDetails: {
        flexDirection: 'column',
        width: 180
    },
    text: {
        fontSize: 15,
        marginTop: 5,
        marginLeft: 10
    },
    reason: {
        fontSize: 10,
        marginLeft: 10,
        color: 'black'
    },
    suggestedBy: {
        fontSize: 10,
        marginLeft: 10,
        color: '#1EA28A'
    },
    textSelected: {
        fontSize: 15,
        marginTop: 5,
        marginLeft: 10,
        color: '#fff'
    },
    reasonSelected: {
        fontSize: 10,
        marginLeft: 10,
        color: '#fff'
    },
    suggestedBySelected: {
        fontSize: 10,
        marginLeft: 10,
        color: '#fff'
    },
})