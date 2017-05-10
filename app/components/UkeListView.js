'use strict';

import React, {Component} from 'react';

import {
  InteractionManager,
  ListView,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';

import {UkeColors} from '../config/ukeColors';

import SongRow from '../components/SongRow';
import {renderSeparator} from '../components/Separator';
import MainBackGroundImage from '../components/MainBackGroundImage';
import PlaceHolderListView from '../components/PlaceHolderListView';

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
  backgroundImage: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:'cover',
    width: deviceWidth
  },
  spinnerHidden: {
    height: 0
  }
});


class SongLibraryListView extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state={renderPlaceholder:true};
  }

  componentWillMount(){
    this.fetchData()
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholder:false});
    });
  }

  fetchData(){
    if (this.props.fetchDataFromNextSource){
        this.props.fetchDataFromNextSource(this.props.nextDataUrl);
    }
  }

  renderRow(data) {
    let listItemBeingFetched = data.resource_link
      == this.props.listItemBeingFetched
    listItemBeingFetched = Boolean(listItemBeingFetched);
    return (
        <SongRow key={data.resource_link}
          {...data}
          onPressCallback={this.props.onChooseListItem}
          songPageBeingFetched={listItemBeingFetched}
        />
    );
  }


  render() {
    if (this.state.renderPlaceholder || this.props.shouldRenderPlaceHolder) {
      return this._renderPlaceHolder();
    }
    let isCurrentSongLibraryPage = this.props.songLibraryUrl == this.props.currentSongPage;
    return (
      <View style={[styles.container]}>
        <MainBackGroundImage >
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          renderSeparator={renderSeparator}
          onEndReached={this.fetchData}
          onEndReachedThreshold={0}
        />
        <ActivityIndicator
          color={UkeColors.GREEN}
          size='large'
          animating={this.props.isFetchingListItem}
          style={this.props.isFetchingListItem ? null : styles.spinnerHidden}
        />
        </MainBackGroundImage>
      </View>
    );
  }

  _renderPlaceHolder() {
    return(
      <PlaceHolderListView />
    )
  }

}

export default SongLibraryListView;
