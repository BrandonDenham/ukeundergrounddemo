'use strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  Navigator,
  TouchableHighlight,
  View,
  Image,
  Text,
  Dimensions,
  Linking
} from 'react-native';

import {UkeColors} from '../config/ukeColors';
import MenuRow from '../components/MenuRow'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {getSongLibraryList} from '../actions/songLibraryActions';
import {getCourseLibraryList} from '../actions/courseLibraryActions';
import {songLibraryUrl} from '../config/urls';
import {signupUrl} from '../config/urls';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity:1,
    padding:0
    //resizeMode: "cover"
  },
  menuTitleText:{
    fontFamily: "Klinic Slab",
    fontSize:25,
    color: UkeColors.GREEN
  },
  menuTitle: {
    height:64,
    backgroundColor:UkeColors.BROWN,
    width: deviceWidth*(1-.4),
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  backgroundImage: {
    width: deviceWidth*(1-.4),
    resizeMode: "cover"
  }
})


/*


<Image
  source={require('../resources/bg.jpg')}
>
</Image>
*/

class MenuContent extends Component {
  constructor(props){
    super(props);
  }

  onPressSignup(){
    Linking.openURL(signupUrl)
      .catch(err => {
        console.log("couldn't open that url");
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../resources/bg.jpg')}
          style={styles.backgroundImage}
        >
        <View style={styles.menuTitle}>
          <Text style={styles.menuTitleText}>
            Menu
          </Text>
        </View>

        <MenuRow
          leftIcon={require('../resources/songs.png')}
          menuItemText="Song Library"
          renderSeparator={true}
          onChoose={this.props.onPressSongLibrary}
        />

        <MenuRow
          leftIcon={require('../resources/lessons-blue.png')}
          menuItemText="Video Lessons"
          renderSeparator={true}
          onChoose={this.props.onPressCourseLibrary}
        />

        <MenuRow
          leftIcon={require('../resources/recent.png')}
          menuItemText="Recent History"
          renderSeparator={true}
        />

        {(
          this.props.isLoggedIn ?
          <View>
            <MenuRow
              leftIcon={require('../resources/logout.png')}
              menuItemText="Logout"
              renderSeparator={true}
            />

            <MenuRow
              leftIcon={require('../resources/contact.png')}
              menuItemText="Contact"
              renderSeparator={false}
            />


          </View>
          :
          <View>
            <MenuRow
              leftIcon={require('../resources/login.png')}
              menuItemText="Login"
              renderSeparator={true}
              onChoose={this.props.onPressLogin}
            />

            <MenuRow
              leftIcon={require('../resources/signup.png')}
              menuItemText="Signup"
              renderSeparator={false}
              onChoose={this.onPressSignup}
            />

          </View>
        )}
        </Image>
      </View>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.profile.logged_in
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onPressSongLibrary: () => {
      Actions.refresh({key:'drawer', open:false});
      dispatch(getSongLibraryList(songLibraryUrl(),Actions.songLibrary));
    },
    onPressCourseLibrary: () => {
      Actions.refresh({key:'drawer', open:false});
      dispatch(getCourseLibraryList(Actions.courseLibrary));
    },
    onPressLogin:() => {
      Actions.login();
    }
  }
}



MenuContent = connect(mapStateToProps,mapDispatchToProps)(MenuContent);
export default MenuContent;
