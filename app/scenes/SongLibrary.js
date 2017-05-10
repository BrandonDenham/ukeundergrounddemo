'use strict'

import React, { Component } from 'react';

import {
  InteractionManager,
  StyleSheet,
  ListView,
  View,
  Image,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
//import ViewPager from 'react-native-viewpager';

import {allSongLibraryUrls,songLibraryUrl} from '../config/urls';
import {userSwipedSongLibraryPage,fetchSongLibraryIfNeededFrom} from '../actions/songLibraryActions';
import {getSongPage} from '../actions/songPageActions';
import UkeListView from '../components/UkeListView';
import PlaceHolderListView from '../components/PlaceHolderListView';
import MainBackGroundImage from '../components/MainBackGroundImage';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  images: {
    height: deviceWidth*.5,
    width: deviceWidth,
    borderWidth:1,
    borderColor:'red'
  },
  viewPager: {
    flex: 1,
    justifyContent: 'center',
    width: deviceWidth
  },
  page: {
    width: deviceWidth,
  }
})


class SongLibrary extends Component {
  constructor(props) {
    super(props);
    this.state={renderPlaceholder:true};
  }

  componentWillMount(){
    Actions.refresh({key:'drawer', open:false});
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholder:false});
    })
  }

  render() {
    if (this.state.renderPlaceholder || !this.props.allSongLibraryUrls.length) {
      return this._renderPlaceHolder();
    }
    return (
      <UkeListView
        dataSource={this.props.songPageDataSource}
        isFetchingListItem={this.props.isFetchingSongLibrary}
        listItemBeingFetched={this.props.songPageBeingFetched}
        fetchDataFromNextSource={this.props.loadNextSongLibrary}
        nextDataUrl={this.props.nextSongLibraryUrl}
        onChooseListItem={this.props.pickSongPage}
        />
    );
  }

  _renderPlaceHolder() {
    return(
      <PlaceHolderListView />
    )
  }

}

const mapStateToProps = (state) => {
  let dataSource =  new ListView.DataSource({
    rowHasChanged: (p1,p2) => p1 !== p2
  });
  let songLibraryUrls = allSongLibraryUrls(state.songLibraries.totalPages) || [];
  let source =[]
  let nextLibraryUrl;
  songLibraryUrls.some(function(url){
    let songList = state.songLibraries.songLists[url];
    if (songList && songList.songs) {
      source = source.concat(songList.songs);
    } else {
      nextLibraryUrl = url;
      return true;
    }
  })

  let songPages = state.songPages;
  let fetchingSongPage = songPages.currentSongPage
    && songPages.songPages[songPages.currentSongPage]
    && songPages.songPages[songPages.currentSongPage].isFetching
    && songPages.currentSongPage;

  dataSource = dataSource.cloneWithRows(
    source
  );

  let songLists = state.songLibraries.songLists
  let isFetchingSongLibrary = state.songLibraries.isFetchingAnySongLibrary
    || false;

  return {
    songPageDataSource: dataSource,
    currentSongLibraryUrl: state.songLibraries.currentSongLibrary,
    allSongLibraryUrls: songLibraryUrls,
    songPageBeingFetched: fetchingSongPage,
    isFetchingSongLibrary: isFetchingSongLibrary,
    nextSongLibraryUrl: nextLibraryUrl
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    pickSongPage: (songPageUrl,songPageImageUrl) => {
      dispatch(getSongPage(songPageUrl,Actions.songPage,songPageImageUrl));
    },
    loadNextSongLibrary: (nextSongLibraryUrl) => {
      if (nextSongLibraryUrl) {
        dispatch(fetchSongLibraryIfNeededFrom(nextSongLibraryUrl));
      }
    }
  }
}


SongLibrary = connect(mapStateToProps,mapDispatchToProps)(SongLibrary);
export default SongLibrary;
