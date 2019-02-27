import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
const checkedBox = require('../assets/checkbox-checked.png');
const unCheckedBox = require('../assets/checkbox-unchecked.png');
const unCheckedBoxGem = require('../assets/checkbox-unchecked-gem.png')

export default class CheckBox extends React.Component {
    render() {
    	let imageLink = this.props.gem ? unCheckedBoxGem : unCheckedBox;
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