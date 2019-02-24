import React, { Component } from 'react'
import { View, WebView, StyleSheet }
import SuggestionScreen from './suggestionScreen'

from 'react-native'
const WebViewExample = () => {
   return (
      <View style = {styles.container}>
         <WebView
         useWebKit={true}
         source = {{ uri: 'https://theblondeabroad.com/ultimate-paris-travel-guide'}}
         />
      </View>
   )
}
export default WebViewExample;

const styles = StyleSheet.create({
   container: {
      height: 350,
   }
})