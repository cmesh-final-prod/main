import { AUTH_LINKEDIN, FETCH_MESHES, SELECT_MESH } from 'actions/types';

import axios from 'axios';

export const addMesh = title => {
  axios.post('/api/mesh/create', title);
};

export const authLinkedin = () => dispatch => {
  const response = axios.get('/api/current_user');

  dispatch({
    type: AUTH_LINKEDIN,
    payload: response
  });
};

export const fetchMeshes = () => dispatch => {
  const response = axios.get('/api/mesh/active');

  dispatch({
    type: FETCH_MESHES,
    payload: response
  });
};

export const selectMesh = meshId => dispatch => {
  dispatch({
    type: SELECT_MESH,
    payload: meshId
  });
};

export const updateMeshWithUserId = values => {
  axios.post('/api/mesh/addAttendee', values);
};
