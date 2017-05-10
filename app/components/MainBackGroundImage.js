'use strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Dimensions,
  StatusBar
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  backgroundImage: {
    flex:1,
//    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:'cover',
    width: deviceWidth,
    height: deviceHeight,
    paddingTop:64
  }
})

class MainBackGroundImage extends Component {
  constructor(props) {
    super (props);
  }
  render () {
    return (
      <Image
        source={this.props.source || require('../resources/bg2.jpg')}
        style={[this.props.style || styles.backgroundImage, this.props.additionalStyles || null]}>
        {this.props.children}
      </Image>
    )
  }

}

export default MainBackGroundImage;
