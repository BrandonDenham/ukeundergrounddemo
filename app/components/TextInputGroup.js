'use strict';

import React, {Component} from 'react';

import {
  ListView,
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import {UkeColors} from '../config/ukeColors';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: UkeColors.LIGHT_GRAY,
    backgroundColor: UkeColors.WHITE,
    paddingLeft:8,
    height: 36,
    borderWidth: 1/2,
    width: deviceWidth*.85,
    marginBottom: 8
  },
  label: {
    backgroundColor: 'transparent',
    color: UkeColors.GREEN,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

class TextInputGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{this.props.label}</Text>
        {this.props.children}
      </View>
    );
  }
}

export default TextInputGroup;
