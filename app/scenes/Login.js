'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  StatusBar,
  Dimensions,
  Linking
} from 'react-native';

import {
  updatePassword,
  updateUsername,
  userAttemptLogin,
  login,
  skipLogin,
  userPressLogin
} from '../actions/logins';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {UkeColors} from '../config/ukeColors';
import MainBackGroundImage from '../components/MainBackGroundImage';
import TextInputGroup from '../components/TextInputGroup';
import {signupUrl} from '../config/urls';
import FullScreenButton from '../components/FullScreenButton';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Form from 'react-native-form';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  textInput: {
    height: 36,
    padding: 4,
    paddingLeft: 30,
    position: 'absolute',
    right: 5,
    fontSize: 16,
    width: deviceWidth*.55,
    borderColor: '#48BBEC',
    fontFamily:'Open Sans',
    borderRadius: 8,
    color: UkeColors.TEXT_GRAY
  },
  center: {
    alignItems: 'center',
  //  justifyContent: 'center',
    padding: 8
  },
  logo: {
    height: .15* deviceHeight,
    width: .9*deviceWidth,
    resizeMode: 'contain',
    marginTop: 20
  },
  error: {
    color: "red",
    backgroundColor: 'transparent',
    marginTop:5,
    marginBottom:5
  },

  explanationText: {
    color: UkeColors.TAN,
    fontFamily: 'Open Sans',
    fontSize: 18,
    padding:10
  },

  invisibleBackground: {
    backgroundColor:'transparent'
  }

});

class Login extends Component {
  constructor(props) {
    super(props)
    this.onSubmitUsername = this.onSubmitUsername.bind(this);
    this._onLoginPress=this._onLoginPress.bind(this);
  }
  componentWillMount(props) {
    StatusBar.setBarStyle('light-content');
    Actions.refresh({key:'drawer', open:false});
  }

  onPressSignup(){
    Linking.openURL(signupUrl)
      .catch(err => {
        console.log("couldn't open that url");
      });
  }

  onSubmitUsername(event){
    this.refs.LoginForm.refs.passwordInput.focus();
  }

  _onLoginPress() {
    let credentials = this.refs.LoginForm.getValues();
    this.props.onLoginPress(credentials.usernameInput,
      credentials.passwordInput);
  }

  render() {
    return (
      <View >
        <MainBackGroundImage source={require('../resources/bg.jpg')}>
          <Image
            style={styles.logo}
            source={require('../resources/logo-white.png')} />
          <Text style={styles.error}>
            {this.props.errorMessage}
          </Text>

          <Form ref="LoginForm">
            <TextInputGroup label='Username'>
              <TextInput
                ref='usernameInput'
                name='usernameInput'
                style={styles.textInput}
                placeholder="enter username"
                enablesReturnKeyAutomatically={false}
                onSubmitEditing={this.onSubmitUsername}
                returnKeyType='next'
                type="TextInput"
              />
            </TextInputGroup>

            <TextInputGroup label='Password'>
              <TextInput
                ref='passwordInput'
                name='passwordInput'
                style={styles.textInput}
                enablesReturnKeyAutomatically={false}
                onSubmitEditing={this._onLoginPress}
                placeholder="enter password"
                returnKeyType='go'
                secureTextEntry={true}
                type="TextInput"
              />
            </TextInputGroup>

          </Form>

          <FullScreenButton
            onPress={this._onLoginPress}
            buttonText="Login"
          />

          <Text style={[styles.explanationText,styles.invisibleBackground]}>
            Don't have an account?
          </Text>

          <FullScreenButton
            onPress={this.props.onSkipLogin}
            buttonText="Try our awesome free lessons"
          />

          <Text style={[styles.explanationText,styles.invisibleBackground]}>
            Or for premium lessons . . .
          </Text>

          <FullScreenButton
            onPress={this.onPressSignup}
            buttonText="Signup"
          />

          <ActivityIndicator
            style={styles.center}
            animating={this.props.loggingIn}
            size='large'
            color={UkeColors.GREEN}
          />

        </MainBackGroundImage>
      </View>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  let loggingIn = state.user.loggingIn || null;

  return {
    username: loggingIn.username || "",
    password: loggingIn.password || "",
    loggingIn: loggingIn.pressedLogin || false,
    errorMessage: loggingIn.loginRequest == "failed"
      ? "This username and password were unable to log in" : false,
    shouldRenderHomePage: state.user.profile.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginPress: (username,password) => {
      dismissKeyboard();
      dispatch(userPressLogin(username,password,Actions.home));
    },
    onSkipLogin: () => {
      dispatch(skipLogin(Actions.home));
    }
  }
}

Login = connect(mapStateToProps,mapDispatchToProps)(Login);

export default Login;
