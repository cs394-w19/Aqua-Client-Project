import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from 'CheckBox';

export default class SuggestedItem extends React.Component {
	constructor(props) {
  		super(props);
  		this.state = {
  			checked:false
  		}
  	}
  	handleCheckBoxClick = () =>  {
  		this.setState({checked:!this.state.checked})
  	}
    render() {
    	return (
    		<View>
    			<CheckBox checked = {this.state.checked}/>
    		</View>
    );
  }
}