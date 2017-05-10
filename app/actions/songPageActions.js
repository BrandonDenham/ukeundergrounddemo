import {contentUrl} from "../config/urls";
import {SONG_PAGE_CACHE_TIME} from '../config/cache';

export const SongPageActions = {
  USER_PICK_SONG_PAGE: "USER_PICK_SONG_PAGE",
  SONG_PAGE_REQUEST: "SONG_PAGE_REQUEST",
  SONG_PAGE_FETCH_SUCCESS: "SONG_PAGE_FETCH_SUCCESS",
  SONG_PAGE_FETCH_FAILURE: "SONG_PAGE_FETCH_FAILURE",
  SONG_PAGE_FETCH_NOT_AUTHORIZED: "SONG_PAGE_FETCH_NOT_AUTHORIZED",
  NO_NEED_TO_FETCH_SONG_PAGE: "NO_NEED_TO_FETCH_SONG_PAGE"
}

function userPickSongPage(url) {
  return {
    type: SongPageActions.USER_PICK_SONG_PAGE,
    url: url
  }
}

function fetchSongPageRequest(url,songPageImageUrl) {
  return {
    type: SongPageActions.SONG_PAGE_REQUEST,
    url: url,
    songPageImageUrl: songPageImageUrl
  }
}

function fetchUneeded() {
    return {
      type: SongPageActions.NO_NEED_TO_FETCH
    }
}

function fetchSongPageFailed(url) {
  return {
    type: SongPageActions.SONG_PAGE_FETCH_FAILURE,
    url: url
  }
}

function fetchSongPageUnauthorized(url) {
  return {
    type: SongPageActions.SONG_PAGE_FETCH_NOT_AUTHORIZED,
    url: url
  }
}

function fetchSongPageSucceded(url,data){
  return {
    type:SongPageActions.SONG_PAGE_FETCH_SUCCESS,
    data: data,
    url: url
  }
}

function renderRoute(url,getState,routeCallback) {
  let title = getState().songPages.songPages[url].content.title;
  title = title.split(" – ")[1] || title;
  if (title.length > 21) {
    title = title.substring(0,19).trim() + "...";
  }
  routeCallback({title:title});
}

function fetchSongPageFrom(url,token,songPageImageUrl,routeCallback,getState) {
  return dispatch => {
    dispatch(fetchSongPageRequest(url,songPageImageUrl))
    let songPageUrl = contentUrl+"?";
    if (token) {
      songPageUrl = songPageUrl + "token=" + token +"&";
    }
    songPageUrl = songPageUrl + "data.song_page=true&url=" + url;

    return fetch(songPageUrl)
      .then(response => {
        if (response.status == 401) {
          dispatch(fetchSongPageUnauthorized(url));
        } else {
          response.json().then(json => {
            dispatch(fetchSongPageSucceded(url,json));
            renderRoute(url,getState,routeCallback);
          })
          .catch(response=>{
            dispatch(fetchSongPageFailed(url));
          });
        }
      })
      .catch(response => {
        dispatch(fetchSongPageFailed(url));
      });
  }
}

function shouldFetchSongPage(url,getState) {
  return true; //TODO: not always return true ;)
}

export function fetchSongPageIfNeededFrom(url,token,songPageImageUrl,routeCallback) {
  return (dispatch,getState) => {
    if (shouldFetchSongPage(url,getState)) {
      dispatch(fetchSongPageFrom(url,token,songPageImageUrl,routeCallback,getState));
    } else {
      renderRoute(url,getState,routeCallback);
      dispatch(fetchUneeded());
    }
  }
}

export function getSongPage(url,routeCallback,songPageImageUrl) {
  routeCallback = routeCallback || function(){};
  return (dispatch,getState) => {
    let user = getState().user;
    let token = user.profile && user.profile.token;
    dispatch(userPickSongPage(url));
    dispatch(fetchSongPageIfNeededFrom(url,token,songPageImageUrl,routeCallback));
  }
}
