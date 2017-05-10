import {SongPageActions} from '../actions/songPageActions';

export default function songPages (
  state={currentSongPage:"",songPages:{}},
  action
) {
  switch (action.type) {
    case SongPageActions.USER_PICK_SONG_PAGE:
      return Object.assign({},state,{currentSongPage: action.url});
    case SongPageActions.SONG_PAGE_REQUEST:
      return getStateFromSongPageRequest(state,action);
    case SongPageActions.SONG_PAGE_FETCH_SUCCESS:
      return getStateFromSongPageSuccess(state,action);
    case SongPageActions.SONG_PAGE_FETCH_FAILURE:
      return getStateFromSongPageFailure(state,action);
    case SongPageActions.SONG_PAGE_FETCH_NOT_AUTHORIZED:
      return getStateFromSongPageUnauthorized(state,action);
    default:
      return state;
  }
}


function getStateFromSongPageRequest(state,action) {
  let newState = Object.assign({},state);
  let songPage = newState.songPages[action.url];
  if (!songPage) {
    songPage = newState.songPages[action.url] = {};
  }
  songPage.isFetching = true;
  songPage.imageUrl = action.songPageImageUrl;
  return newState;
}

function getStateFromSongPageSuccess(state,action) {
  let newState = Object.assign({},state);
  let songPage = newState.songPages[action.url];
  songPage.lastFetched = new Date().getTime();
  songPage.authorized = true;
  songPage.isFetching = false;
  songPage.content = action.data;
  return newState;
}

function getStateFromSongPageUnauthorized(state,action) {
  let newState = Object.assign({},state);
  let songPage = newState.songPages[action.url];
  songPage.lastFetched = 1;
  songPage.authorized = false;
  return newState;
}

function getStateFromSongPageFailure(state,action) {
  let newState = Object.assign({},state);
  let songPage = newState.songPages[action.url];
  songPage.isFetching = false;
  return newState;
}
