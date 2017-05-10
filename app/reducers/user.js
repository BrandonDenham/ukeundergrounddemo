import {Logins} from "../actions/logins";
import {SongPageActions} from "../actions/songPageActions";
import { combineReducers } from 'redux';

function loggingIn (state={}, action) {
  switch (action.type) {
    case Logins.UPDATE_USERNAME_AND_PASSWORD:
      return Object.assign({}, state, {username: action.username, password: action.password});
    case Logins.USER_ATTEMPT_LOGIN:
      return Object.assign({}, state, {pressedLogin: true});
    case Logins.LOGIN_REQUEST:
      return Object.assign({}, state, {loginRequest: true});
    case Logins.LOGIN_SUCCESS:
    case Logins.LOGIN_SKIP:
      return {};
    case Logins.LOGIN_FAIL:
      return Object.assign(
        {},
        state,
        {password:"", pressedLogin: null, loginRequest: "failed"}
      );
    default:
      return state;
  }
}

function profile(state={}, action) {
  switch (action.type) {
    case Logins.LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);
    case Logins.LOGIN_SKIP:
      return Object.assign({},{status:"skip_login", access_level: "anonymous"});
    default:
      return state;
  }
}

function videoHistory(state=[], action) {
  switch (action.type) {
    case SongPageActions.SONG_PAGE_FETCH_SUCCESS:
      let oldState = Object.assign([],state);
      /*
      newstate = newState.filter(function(element){
        return element.videoUrl != action.url
      })*/
      let newVideo = {videoUrl: action.url, videoType:"song"};

      let newState = oldState.filter(function(element){
        return element.videoUrl !== action.url;
      })

      newState.unshift(newVideo);
      return newState;
    default:
      return state;
  }
}

export const user = combineReducers({
  loggingIn,
  profile,
  videoHistory
});
