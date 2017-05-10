'use strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  WebView
} from 'react-native';

import {UkeColors} from '../config/ukeColors';
import MainBackGroundImage from '../components/MainBackGroundImage';
import Separator from '../components/Separator';
import {vimeoInjection} from '../resources/htmljs/vimeoInjection';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'center'
  },
  image: {
    // alignItems: 'center',
    // justifyContent: 'center',
    minWidth: deviceWidth,
    minHeight: deviceWidth/1.8
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth/4,
    height: deviceWidth/4,
    opacity:.6
  },
  titleFont:{
    fontFamily: 'Klinic Slab',
    color: UkeColors.GREEN,
    fontSize: 26,
    alignSelf: 'center',
    fontWeight:'bold'
  },
  textContainer:{
    padding:18
  },
  textFont: {
    fontFamily: 'Open Sans',
    color: UkeColors.TEXT_GRAY,
    fontSize:16
  },
  invisibleBackground: {
    backgroundColor:"transparent"
  },
  textTitleContainer:{
    paddingBottom:10
  }
});


class VideoPage extends Component {
  constructor(props) {
    super(props);
  }


  onShouldStartLoadWithRequest(event) {
    return true;
  }

  renderLoadingIndicator() {
    return (
      <ActivityIndicator
        animating={true}
        size='large'
        color={UkeColors.GREEN}
        style={{position:"absolute", left: deviceWidth/2-16, top: 80}}
      />
    )
  }

  componentDidMount() {
    console.log("component mounted:")
    this.removeConstraints();
  }

  removeConstraints() {
    let webview = this.refs['webview'].getWebViewHandle()
    console.log(webview);
  }

  render() {
    return(
      <View style={styles.container}>
        <MainBackGroundImage>
          <ScrollView>
            <WebView
              ref='webview'
              source={{uri: this.props.videoUrl}}
              style={styles.image}
              scalesPageToFit={false}
              injectedJavascript={vimeoInjection}
              renderLoading={this.renderLoadingIndicator}
              startInLoadingState={true}
              allowsInlineMediaPlayback={true}
            />

            <View style={styles.textContainer }>
              <View style={styles.textTitleContainer}>
                <Text
                  style={[styles.invisibleBackground,styles.titleFont]} >
                  {this.props.headline}
                </Text>

                {(
                  this.props.subHeadline ?
                  <Text style={
                    [
                      styles.textFont,
                      styles.invisibleBackground,
                      {fontWeight: 'bold', alignSelf: 'center'}
                    ]} >
                    {this.props.subHeadline}
                  </Text>
                  :null
                )}
              </View>
              <Separator />

              <Text style={
                [
                  styles.textFont,
                  styles.invisibleBackground,
                  {paddingTop:5}
                ]}
              >
                {this.props.description}
              </Text>
            </View>
          </ScrollView>
        </MainBackGroundImage>
      </View>
    );
  }
}

export default VideoPage;
