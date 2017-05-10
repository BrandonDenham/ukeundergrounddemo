import {contentUrl} from "../config/urls";
import {SONG_LIBRARY_CACHE_TIME} from "../config/cache";
import {Actions} from 'react-native-router-flux';

export const SongLibraryActions = {
  USER_PICK_SONG_LIBRARY: "USER_PICK_SONG_LIBRARY",
  USER_VIEW_SONG_LIBRARY_PAGE:"USER_VIEW_SONG_LIBRARY_PAGE",
  SONG_LIBRARY_REQUEST: "SONG_LIBRARY_REQUEST",
  SONG_LIBRARY_FETCH_SUCCESS: "SONG_LIBRARY_FETCH_SUCCESS",
  SONG_LIBRARY_FETCH_FAILURE: "SONG_LIBRARY_FETCH_FAILURE",
  NO_NEED_TO_FETCH_SONG_LIBRARY: "NO_NEED_TO_FETCH_SONG_LIBRARY",
  USER_SWIPED_SONG_LIBRARY: "USER_SWIPED_SONG_LIBRARY"
}

function userPickSongLibrary(url) {
  return {
    type: SongLibraryActions.USER_PICK_SONG_LIBRARY,
    url: url
  }
}

function fetchSongLibraryRequest(url) {
  return {
    type: SongLibraryActions.SONG_LIBRARY_REQUEST,
    url: url
  }
}

function fetchUneeded() {
    return {
      type: SongLibraryActions.NO_NEED_TO_FETCH_SONG_LIBRARY
    }
}

function fetchSongLibraryFailed(url) {
  return {
    type: SongLibraryActions.SONG_LIBRARY_FETCH_FAILURE,
    url: url
  }
}

function fetchSongLibrarySucceded(url,data) {
  return {
    type: SongLibraryActions.SONG_LIBRARY_FETCH_SUCCESS,
    data: data,
    url: url
  }
}

function userSwiped() {
  return {
    type: SongLibraryActions.USER_SWIPED_SONG_LIBRARY,
    time: new Date().getTime()
  }
}

function fetchSongLibraryFrom(url) {
  return dispatch => {
    dispatch(fetchSongLibraryRequest(url));
    return fetch(contentUrl + "?url=" + url)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchSongLibrarySucceded(url,json));
      })
      .catch(response => {
        dispatch(fetchSongLibraryFailed(url))
      });
  }

}

function shouldFetchLibrary(url,getState) {
  let songLists = getState().songLibraries.songLists;
  let songLibrary = songLists[url];
  let cacheThreshold = new Date().getTime() - SONG_LIBRARY_CACHE_TIME;

  if (!songLibrary){
    return true;
  } else if (songLibrary.isFetching) {
    return false;
  } else if (
    songLibrary.lastFetched
      && cacheThreshold<songLibrary.lastFetched
  ) {
    return false;
  } else {
    return true;
  }
}

export function fetchSongLibraryIfNeededFrom(url) {
  return (dispatch,getState) => {
    if (shouldFetchLibrary(url,getState)){
      dispatch(fetchSongLibraryFrom(url));
    } else {
      dispatch(fetchUneeded());
    }
  }
}

export function userSwipedSongLibraryPage(url) {
  return (dispatch) => {
    dispatch(userSwiped());
    dispatch(getSongLibraryList(url));
  }
}

export function getSongLibraryList (url,routeCallback) {
  routeCallback = routeCallback || function(){};
  return (dispatch) => {
    dispatch(userPickSongLibrary(url));
    routeCallback();
    dispatch(fetchSongLibraryIfNeededFrom(url));
  }
}
