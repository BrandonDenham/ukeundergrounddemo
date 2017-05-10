import {SongLibraryActions} from '../actions/songLibraryActions';

export default function songLibraries (state={songLists:{}}, action) {
  switch (action.type) {
    case SongLibraryActions.USER_PICK_SONG_LIBRARY:
      return Object.assign({},state,{currentSongLibrary: action.url});
    case SongLibraryActions.SONG_LIBRARY_REQUEST:
      return getStateFromSongLibraryRequest(state,action);
    case SongLibraryActions.SONG_LIBRARY_FETCH_SUCCESS:
      return getStateFromSongLibrarySuccess(state,action);
    case SongLibraryActions.SONG_LIBRARY_FETCH_FAILURE:
      return getStateFromSongLibraryFailure(state,action);
    default:
      return state;
  }
}

function getStateFromSongLibraryRequest(state,action) {
  let newRequestState = Object.assign({},state);
  let songListInRequestState = newRequestState.songLists[action.url];
  if (!songListInRequestState) {
    songListInRequestState = newRequestState.songLists[action.url] = {};
  }
  songListInRequestState.isFetching = true;
  newRequestState.isFetchingAnySongLibrary=true;
  return newRequestState;
}

function getStateFromSongLibrarySuccess(state,action) {
  let newSuccessState = Object.assign({},state);
  let songListInSuccessState = newSuccessState.songLists[action.url]
  newSuccessState.totalPages = action.data.total_pages;
  songListInSuccessState.lastFetched = new Date().getTime();
  songListInSuccessState.songs = action.data.list;
  songListInSuccessState.page = action.data.page;
  songListInSuccessState.isFetching = false;
  newSuccessState.isFetchingAnySongLibrary = false;
  return newSuccessState;
}

function getStateFromSongLibraryFailure(state,action) {
  let newFailureState = Object.assign({},state);
  let songListInFailureState = newFailureState.songLists[action.url];
  songListInFailureState.isFetching = false;
  newFailureState.isFetchingAnySongLibrary = false;
  return newFailureState;
}
