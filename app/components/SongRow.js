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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  flexRow: {
    flexDirection: 'row',
    //alignItems: 'center',
    alignSelf: 'stretch',
    padding: 5,
    width: deviceWidth,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:5
  },
  songImage: {
    width: 100,
    height: 100,
    marginLeft:3,
    backgroundColor: UkeColors.GRAY
  },
  songContents: {
    paddingLeft: 5,
    maxWidth: deviceWidth-110
  },
  songTitle:{
    color:UkeColors.GREEN,
    fontFamily:"Klinic Slab",
    fontSize: 23
  },
  textFont: {
    fontFamily: 'Open Sans',
    color: UkeColors.TEXT_GRAY,
    fontSize:16
  },
  songArtist: {
    color: UkeColors.BROWN,
    fontStyle: "italic"
  },
  textDecoration: {
    textDecorationLine: 'line-through'
  }
});

class SongRow extends Component {
  constructor(props) {
    super(props);
    this.onPressSongPage = this.onPressSongPage.bind(this);
  }

  onPressSongPage() {
    this.props.onPressCallback(this.props.resource_link,this.props.image_url);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.onPressSongPage}
        underlayColor={UkeColors.TAN}>
        <View >
          <ActivityIndicator
            style={this.props.songPageBeingFetched ? styles.center : {height: 0}}
            animating={this.props.songPageBeingFetched}
            color={UkeColors.GREEN}
          />
          <View style={styles.flexRow}>
            <Image
              source={{uri: this.props.image_url}}
              style={styles.songImage}
              />
            <View style={styles.songContents}>

              <Text
                style={styles.songTitle}
                numberOfLines={1} >
                {this.props.song_title}
              </Text>

              <Text
                lineBreakMode='tail'
                numberOfLines={1}
                style={[styles.textFont,{fontWeight:"bold"}]}>
                {this.props.category_title}
              </Text>

              {(
                this.props.artist && this.props.artist.length
                ?
                  <Text
                    lineBreakMode='tail'
                    numberOfLines={1}
                    style={[styles.textFont,styles.songArtist]}>
                    -{this.props.artist}
                  </Text>
                :null
              )}
              <Text
                lineBreakMode='tail'
                numberOfLines={1}
                style={[styles.textFont, this.props.textDecoration]}>
                {this.props.level}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default SongRow;
