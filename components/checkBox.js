import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

const icon = require('../assets/navBarIcons/Icon-06.png');

export default class CheckBox extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.handleCheckBoxClick}>
                <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#ffffffcc'}}>
                    {this.props.checked &&
                    <Image source={icon} style={{width: 38, height: 40, position: 'absolute', right: -6, top: -5}}/>
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
}