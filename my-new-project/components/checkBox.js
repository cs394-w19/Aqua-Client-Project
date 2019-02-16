import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import checkedBox from '../assets/checkbox-checked.svg'
import unCheckedBox from '../assets/checkbox-unchecked.svg'

export default class CheckBox extends React.Component {
    render() {
    	let imageLink = unCheckedBox;
    	if(this.props.checked) {
    		imageLink = checkedBox;
    	}
    	return (
    		<View>
    			<Image source={imageLink}/>
    		</View>
    );
  }
}