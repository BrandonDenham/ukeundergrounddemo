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

  image: {
    height: 30,
    width: 35
  },

  view: {
    position: "absolute",
    right: 5,
    bottom: 7
  }

});

export class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.onPressMenuButton = this.onPressMenuButton.bind(this);
  }

  onPressMenuButton() {
    Actions.refresh({key:'drawer', open:true});
  }

  render() {

    return (

      <TouchableHighlight
        style={styles.view}
        onPress={this.onPressMenuButton}>
        <Image
          source={require('../resources/menu-white.png')}
          style={styles.image}

        />
      </TouchableHighlight>

    );
  }
}

export function renderMenuButton (route) {
    return(
      <MenuButton/>
    );
}
