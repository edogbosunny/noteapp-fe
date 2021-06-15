import {combineReducers} from 'redux';
import sampleReducer from './sample-reducer';
import notesReducer from './notes-reducer';


export default combineReducers({
  sampleReducer,
  notesReducer
});
