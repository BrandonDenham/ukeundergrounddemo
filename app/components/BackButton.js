'use strict';

import React, { Component } from 'react';
import {
   AppRegistry,
   StyleSheet,
   Navigator,
   NavigatorIOS,
   Text,
   Image,
   TouchableHighlight,
   View
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export const styles = StyleSheet.create({

  backImage: {
    height: 26,
    width: 33
  },

  backView: {
    position: "absolute",
    left: 6,
    bottom: 7
  }

})

export class BackButton extends Component {
  constructor(props) {
    super(props);
    this.onPressBackButton = this.onPressBackButton.bind(this);
  }

  onPressBackButton() {
    Actions.pop();
  }

  render() {

    return (

      <TouchableHighlight
        style={styles.backView}
        onPress={this.onPressBackButton}>
        <View>
          <Image
            source={require('../resources/back.png')}
            style={styles.backImage}
          />
        </View>
      </TouchableHighlight>

    );
  }
}

export function renderBackButton (route) {
    return(
      <BackButton/>
    );
}
