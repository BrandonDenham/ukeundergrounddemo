
import { combineReducers } from 'redux';
import {user} from './user';
import songLibraries from './songLibrary'
import songPages from './songPage';
import courseLibrary from './courseLibrary';
import courses from './courses';
import lessonPages from './lessonPage';

//TODO: Memoize all the shits

const UkuleleUndergroundAppState = combineReducers({
  user,
  songLibraries,
  courseLibrary,
  courses,
  songPages,
  lessonPages
});

export default UkuleleUndergroundAppState;
