import instance from '../../lib/axios';
import {
  GET_NOTES_FAILURE, GET_NOTES_SUCCESSFUL, GET_NOTES_REQUEST, UPDATE_NOTES_REQUEST,
  UPDATE_NOTES_SUCCESSFUL,
  UPDATE_NOTES_FAILURE
} from '../action-types';

const getNotesRequest = () => ({
  type: GET_NOTES_REQUEST,
});

const getNotesSuccess = (payload: any) => ({
  type: GET_NOTES_SUCCESSFUL,
  payload,
});

const getNotesFailure = (error: any) => ({
  type: GET_NOTES_FAILURE,
  error,
});

export const getNotes = () => async (dispatch: any) => {
  try {
    dispatch(getNotesRequest());
    const request = await instance.get(`notes`);
    return dispatch(getNotesSuccess(request));
  } catch (error) {
    return dispatch(getNotesFailure(error));
  }
};

// update notes
const updateNotesRequest = () => ({
  type: UPDATE_NOTES_REQUEST,
});

const updateNotesSuccess = (payload: any) => ({
  type: UPDATE_NOTES_SUCCESSFUL,
  payload,
});

const updateNotesFailure = (error: any) => ({
  type: UPDATE_NOTES_FAILURE,
  error,
});

export const updateNotes = (id: string, payload: object) => async (dispatch: any) => {
  try {
    dispatch(updateNotesRequest());
    const request = await instance.put(`note/${id}`, payload);
    console.log('--=-=>', payload)
    return dispatch(updateNotesSuccess(request));
  } catch (error) {
    return dispatch(updateNotesFailure(error));
  }
};
