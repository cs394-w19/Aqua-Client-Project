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
    	let style = this.props.checked? {width:  50, height: 50} : {width: 50, height: 50, opacity: 0.8}

    	return (
    		<TouchableWithoutFeedback onPress={this.props.handleCheckBoxClick}>
    			<Image source={imageLink} style={style}/>
    		</TouchableWithoutFeedback>
    );
  }
}