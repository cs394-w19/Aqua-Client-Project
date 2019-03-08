import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
const checkedBox = require('../assets/heart-green.png');
const unCheckedBox = require('../assets/heart.png');

export default class CheckBox extends React.Component {
    render() {
    	let imageLink = unCheckedBox;
    	if(this.props.checked) {
    		imageLink = checkedBox;
    	}
    	return (
    		<TouchableWithoutFeedback onPress={this.props.handleCheckBoxClick}>
    			<Image source={imageLink} style={{width: 50, height: 50, opacity: 0.5}}/>
    		</TouchableWithoutFeedback>
    );
  }
}