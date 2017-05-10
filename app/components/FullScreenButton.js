import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {UkeColors} from '../config/ukeColors';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonText: {
    color:UkeColors.WHITE,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    backgroundColor:UkeColors.GREEN,
    borderRadius:3,
    padding: 5,
    width: deviceWidth*.85,
    alignItems: 'center'
  }
})

class FullScreenButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.button}
        underlayColor={UkeColors.DARK_GREEN}
      >
        <Text style={styles.buttonText}>{this.props.buttonText}</Text>
      </TouchableHighlight>
    )
  }
}

export default FullScreenButton;
