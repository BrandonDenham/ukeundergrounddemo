'use strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';

import {UkeColors} from '../config/ukeColors';

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 5,
    paddingTop:20,
    paddingBottom:20
  },
  menuItemText: {
    fontFamily: "Open Sans",
    fontSize: 15,
    fontWeight: "bold",
    color: UkeColors.TAN,
    backgroundColor: "transparent",
    paddingBottom:4,
    marginLeft:5
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor:UkeColors.GRAY,
  },
  menuImage: {
    width: 23,
    height:23,
    resizeMode: "contain"
  },
  imageRight: {
    position: "absolute",
    right:5
  }
})


class MenuRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onChoose}
        underlayColor={UkeColors.BROWN}>
        <View
          style={[
            styles.menuRow,
            this.props.renderSeparator ? styles.bottomBorder:null
          ]}>
          <Image
            source={this.props.leftIcon}
            style={styles.menuImage}/>
          <Text style={styles.menuItemText}>{this.props.menuItemText}</Text>
          <Image
            source={require('../resources/forward.png')}
            style={[styles.menuImage, styles.imageRight]}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default MenuRow;
