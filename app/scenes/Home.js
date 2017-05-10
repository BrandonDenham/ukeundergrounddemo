'use strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Dimensions,
  StatusBar
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {getSongLibraryList} from '../actions/songLibraryActions';
import {getCourseLibraryList} from '../actions/courseLibraryActions';
import {songLibraryUrl} from '../config/urls';

import MainBackGroundImage from '../components/MainBackGroundImage';
import CategoryCard from '../components/CategoryCard';

import {UkeColors} from '../config/ukeColors';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 90
  },


  backgroundImage: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:'cover'
  }
})



class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount(props) {
    StatusBar.setBarStyle('light-content')
  }
  render() {
    return (
      <View style={styles.container}>
        <MainBackGroundImage>
          <CategoryCard
            onPress={this.props.onPressSongLibrary}
            image={require('../resources/library.jpg')}
            titleText="Song Lesson Library"
          />

          <CategoryCard
            onPress={this.props.onPressLessonLibrary}
            image={require('../resources/teaching-smaller.jpg')}
            titleText="Video Lesson Library"
          />

        </MainBackGroundImage>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressSongLibrary: () => {
      dispatch(getSongLibraryList(songLibraryUrl(),Actions.songLibrary));
    },
    // TODO: songLessongPress -- and build the song lesson logic ;)
    onPressLessonLibrary: () => {
      dispatch(getCourseLibraryList(Actions.courseLibrary));
    }
  }
}

Home = connect(null,mapDispatchToProps)(Home);
export default Home;
