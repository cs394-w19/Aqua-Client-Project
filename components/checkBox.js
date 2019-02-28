import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
const checkedBox = require('../assets/checkbox-checked.png');
const unCheckedBox = require('../assets/checkbox-unchecked.png');

export default class CheckBox extends React.Component {
    render() {
    	let imageLink = unCheckedBox;
    	if(this.props.checked) {
    		imageLink = checkedBox;
    	}
    	return (
    		<TouchableWithoutFeedback onPress={this.props.handleCheckBoxClick}>
    			<Image source={imageLink} style={{width: 50, height: 50}}/>
    		</TouchableWithoutFeedback>
    );
  }
}