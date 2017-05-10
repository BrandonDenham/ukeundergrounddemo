import {loginUrl} from "../config/urls";

export const Logins = {
  USER_ATTEMPT_LOGIN: "USER_ATTEMPT_LOGIN",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGIN_SKIP: "LOGIN_SKIP",
  UPDATE_USERNAME:"UPDATE_USERNAME",
  UPDATE_PASSWORD:"UPDATE_PASSWORD",
  UPDATE_USERNAME_AND_PASSWORD:"UPDATE_USERNAME_AND_PASSWORD",
  LOGOUT: "LOGOUT"
}

export function userAttemptLogin() {
  return {
    type: Logins.USER_ATTEMPT_LOGIN
  }
}

export function updateUsernameAndPassword (username,password) {
  return {
    type: Logins.UPDATE_USERNAME_AND_PASSWORD,
    username: username,
    password: password
  }
}

export function loginSkipped(){
  return {
    type: Logins.LOGIN_SKIP
  }
}

export function skipLogin(routeCallback) {
  return (dispatch) => {
    dispatch(loginSkipped());
    routeCallback();
  }
}

export function loginRequest(username,password) {
  return {
    type: Logins.LOGIN_REQUEST,
    username: username,
    password: password
  }
}

export function loginFailed () {
  return {
    type: Logins.LOGIN_FAIL
  }
}

export function loginSucceeded(user) {
  return {
    type: Logins.LOGIN_SUCCESS,
    user: user
  }
}
export function userPressLogin(username,password,routeCallback) {
  return (dispatch, getState) => {
    dispatch(updateUsernameAndPassword(username,password));
    dispatch(login(username, password, routeCallback));
  }
}
export function login(username,password,routeCallback) {
  return (dispatch,getState) => {
    dispatch(loginRequest(username,password));
    let requestBody = JSON.stringify({
      username: username,
      password: password
    });
    return fetch(loginUrl,
      {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        method: "POST",
        body: requestBody
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dipatch(loginFailed);
        } else {
          let user = json.user;
          user.logged_in = json.status == "logged_in";
          user.password = password;
          dispatch(loginSucceeded(user));
          routeCallback();
        }
      })
      .catch(response => dispatch(loginFailed()));
  }
}
