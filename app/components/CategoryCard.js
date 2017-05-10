'use strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {UkeColors} from '../config/ukeColors';
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  categoryContainer:{
    width:deviceWidth*.85,
    flex: 1,
    alignSelf: 'stretch',
//    marginBottom:20,
  },
  categoryTitleText: {
    flex:1,
    fontFamily: 'Klinic Slab',
    fontSize: 24,
    padding: 8,
    paddingBottom:4,
    color: UkeColors.TAN,
    backgroundColor: UkeColors.GREEN_WITH_TRANSPARENCY
  },
  images: {
    //height: Dimensions.get("window").width*.5,
    width:deviceWidth*.85,
    height:deviceWidth*.85/1.9,
    resizeMode: 'cover',

  },
  forwardImage: {
    position: 'absolute',
    height: 23,
    width:23,
    resizeMode: 'cover',
    bottom:8,
    right:3
  },
  addSpace: {
    marginBottom: 20
  }
});


class CategoryCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <TouchableHighlight
        style={styles.addSpace}
        onPress={this.props.onPress}
        underlayColor={UkeColors.GREEN}>
        <View style={styles.categoryContainer}>
          <Image
            source={this.props.image}
            style={styles.images}
          />
          <Text style={styles.categoryTitleText}>{this.props.titleText}</Text>
          <Image style={styles.forwardImage}
            source={require('../resources/forward-gray.png')} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default CategoryCard;
