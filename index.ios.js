/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 /**
  * Sample React Native App
  * https://github.com/facebook/react-native
  * @flow
  */

import React, { Component } from 'react';
import {
   AppRegistry,
   StyleSheet,
   Navigator,
   NavigatorIOS,
   Text,
   View
} from 'react-native';

import { Router, Scene, DefaultRenderer } from 'react-native-router-flux';

import Login from './app/scenes/Login';
import Home from './app/scenes/Home';
import SongLibrary from './app/scenes/SongLibrary';
import CourseLibrary from './app/scenes/CourseLibrary';
import CoursePage from './app/scenes/CoursePage';
import SongPage from './app/scenes/SongPage';
import LessonPage from './app/scenes/LessonPage'

import Menu from './app/scenes/Menu';
import {renderMenuButton, styles as menuButtonStyles} from './app/components/MenuButton';
import PlaceHolderListView from './app/components/PlaceHolderListView';
import {renderBackButton, styles as backButtonStyles } from './app/components/BackButton';

import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import UkuleleUndergroundAppState from './app/reducers/reducers';


const RouterWithRedux = connect()(Router);
//console.log(Router);

import thunk from 'redux-thunk';

let ukeAppStore = createStore(
  UkuleleUndergroundAppState,
  applyMiddleware(thunk)
);

//

// logger
//let unsub = ukeAppStore.subscribe(()=> console.log(ukeAppStore.getState().user));


const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   navBar: {
     backgroundColor:"#1a0803",

   },
   navBarTitle: {
     fontFamily: "Klinic Slab",
     color: "#1e874a",
     fontSize:30
   }
});

class UkuleleUndergroundApp extends Component {
  render() {
    return(
      <Provider store={ukeAppStore}>
        <RouterWithRedux>
          <Scene key="root"  >
            <Scene key="drawer" component={Menu} open={false} >
              <Scene key="main" >
                <Scene
                  key="test"
                  title="Test"
                  component={PlaceHolderListView}
                  renderRightButton={renderMenuButton}
                  rightButtonStyle={menuButtonStyles}
                  renderLeftButton={()=>null}
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  />

                <Scene
                  key="login"
                  component={Login}
                  title="Login"
                  initial={true}
                  hideNavBar={true}
                />
                <Scene
                  key="home"
                  component={Home}
                  title="Master the Ukulele"
                  type="reset"
                  renderRightButton={renderMenuButton}
                  rightButtonStyle={menuButtonStyles}
                  renderLeftButton={()=>null}
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                />
                <Scene
                  key="songLibrary"
                  component={SongLibrary}
                  title="Song Lesson Library"
                  renderRightButton={renderMenuButton}
                  rightButtonStyle={menuButtonStyles}
                  navigationBarStyle={styles.navBar}
                  renderBackButton={renderBackButton}
                  titleStyle={styles.navBarTitle}
                />
                <Scene
                  key="courseLibrary"
                  component={CourseLibrary}
                  title="Course Library"
                  renderRightButton={renderMenuButton}
                  rightButtonStyle={menuButtonStyles}
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  renderBackButton={renderBackButton}
                />
                <Scene
                  key="coursePage"
                  component={CoursePage}
                  title="Course Page"
                  renderRightButton={renderMenuButton}
                  rightButtonStyle={menuButtonStyles}
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  renderBackButton={renderBackButton}
                />
                <Scene
                  key="songPage"
                  component={SongPage}
                  renderRightButton={renderMenuButton}
                  rightButtonStyle={menuButtonStyles}
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  renderBackButton={renderBackButton}
                />
                <Scene
                  key="lessonPage"
                  component={LessonPage}
                  renderRightButton={renderMenuButton}
                  rightButtonStyle={menuButtonStyles}
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  renderBackButton={renderBackButton}
                />
              </Scene>
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('UkuleleUndergroundApp', () => UkuleleUndergroundApp);
