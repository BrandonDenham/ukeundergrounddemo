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

import {watchSongVideo} from '../actions/songPageActions';
import {UkeColors} from '../config/ukeColors';
import VideoPage from '../components/VideoPage';
import {connect} from 'react-redux';



class SongPage extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <VideoPage
        videoUrl={this.props.songPageVideoUrl}
        headline={this.props.lesson}
        subHeadline={this.props.songPageArtist}
        description={this.props.songPageDescription}
      />
    );
  }
}

const mapStateToProps = (state,ownProps) =>{
  let songPage = state.songPages.songPages[state.songPages.currentSongPage];
  let content = songPage.content || {}
  let songPageDescription =  filterDescription(content.description
    && content.description.replace(/\n\n/g,"\n").replace(/\n/g,"\n\n"));

  return {
    songPageVideoUrl: content.video_url && content.video_url.replace(/^\/\//,"https://"),
    songPageArtist: content.artist,
    lesson: content.title.split(" – ")[0],
    songPageDescription: songPageDescription
  }
}

let loginIsRequired = (description) => {
  return description.match(/please\ login/i)
}

let filterDescription = (description) => {
  return description.split("Membership Login")[0];
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSongPageVideo: () => {
      dispatch(watchSongVideo());
    }
  }
}

SongPage = connect(mapStateToProps,mapDispatchToProps)(SongPage);
export default SongPage;
