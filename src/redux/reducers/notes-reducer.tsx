import initialState from './initial-state';
import {
  GET_NOTES_FAILURE, GET_NOTES_SUCCESSFUL, GET_NOTES_REQUEST, UPDATE_NOTES_REQUEST,
  UPDATE_NOTES_SUCCESSFUL,
  UPDATE_NOTES_FAILURE
} from '../action-types';

const fetchNotesReducer = (state = initialState.auth, action: any) => {
  switch (action.type) {
    case GET_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTES_SUCCESSFUL:
      return {
        ...state,
        error: false,
        loading: false,
        notes: action.payload,
        success: true,
      };
    case GET_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false,
      };
    // update notes
    case UPDATE_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_NOTES_SUCCESSFUL:
      return {
        ...state,
        error: false,
        loading: false,
        updatednote: action.payload,
        success: true,
      };
    case UPDATE_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default fetchNotesReducer;
