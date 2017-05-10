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


import DummySongRow from '../components/DummySongRow';
import Separator from '../components/Separator';
import MainBackGroundImage from '../components/MainBackGroundImage';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
});

class PlaceHolderListView extends Component {
  constructor(props) {
    super(props);
  }
/*
<SongRow
  song_title='----------------'
  category_title='-------'
  artist='----------'
  level='---------'
/>
<Separator />
<SongRow
  song_title='----------------'
  category_title='-------'
  artist='----------'
  level='---------'
/>
<Separator />
<SongRow
  song_title='----------------'
  category_title='-------'
  artist='----------'
  level='---------'
/>
<Separator />
<SongRow
  song_title='----------------'
  category_title='-------'
  artist='----------'
  level='---------'
/>
<Separator />
<SongRow
  song_title='----------------'
  category_title='-------'
  artist='----------'
  level='---------'
/>
<Separator />
<SongRow
  song_title='----------------'
  category_title='-------'
  artist='----------'
  level='---------'
/>
<Separator />
*/


  render() {
    return (

        <MainBackGroundImage>
          <DummySongRow />
          <Separator/>
          <DummySongRow />
          <Separator/>
          <DummySongRow />
          <Separator/>
          <DummySongRow />
          <Separator/>
          <DummySongRow />
          <Separator/>
          <DummySongRow />
          <Separator/>
        </MainBackGroundImage>

    );
  }
}

export default PlaceHolderListView;
