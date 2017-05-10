'use strict';

import React, {Component} from 'react';

import {
  ListView,
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';

import Hr from 'react-native-hr';



class Separator extends Component {

  render() {
    return (
      <Hr lineColor={this.props.lineColor || '#b3b3b3' } />
    )
  }


}

export function renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
  return (
    <Separator key={rowID} />
  )
}

export default Separator;
