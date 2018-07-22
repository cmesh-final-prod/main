import {
  CLEAR_STATE,
  SELECT_MESH,
  POST_LOCATION_TO_STORE,
  FETCH_AUTH_LINKEDIN_USER,
  CREATE_MESH,
  FETCH_MESHES,
  FETCH_MESH_USERS,
  ADD_MESH_USER,
  EXIT_MESH_USER,
  FETCH_MESH_ORGANIZER
} from 'actions/types';
import axios from 'axios';

//////////////////////////////////////////////////////////////////
//////                  --ATTENTION--                        /////
//////   PROMISE RESOLUTION WITH REDUX PROMISE MIDDLEWARE    /////
//////     SEND UNRESOLVED PROMISES via ACTION.PAYLOAD       /////
//////     DO NOT RESOLVE PROMISES IN ACTION CREATORS        /////
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
////////////            CLIENT ONLY                ///////////////
//////////////////////////////////////////////////////////////////

export const clearState = () => {
  return {
    type: CLEAR_STATE
  };
};

export const selectMesh = meshId => (dispatch, getState) => {
  const { meshes } = getState();
  const filteredArray = meshes.data.filter(mesh => {
    return mesh.meshId === meshId;
  });

  const selectedMeshProps = {
    meshId,
    data: filteredArray[0]
  };

  dispatch({
    type: SELECT_MESH,
    payload: selectedMeshProps
  });
};

export const postLocationToStore = (lng, lat) => {
  return {
    type: POST_LOCATION_TO_STORE,
    payload: { lng, lat }
  };
};

//////////////////////////////////////////////////////////////////
////////////            AUTH ROUTES                ///////////////
//////////////////////////////////////////////////////////////////

export const fetchAuthLinkedinUser = () => dispatch => {
  const response = axios.get('/api/current_user');

  dispatch({
    type: FETCH_AUTH_LINKEDIN_USER,
    payload: response
  });
};

//////////////////////////////////////////////////////////////////
////////////             MESH ROUTES               ///////////////
//////////////////////////////////////////////////////////////////

export const fetchMeshes = (lng, lat) => dispatch => {
  if (lng && lat) {
    const response = axios.get(`/api/meshes?lng=${lng}&lat=${lat}`);
    dispatch({
      type: FETCH_MESHES,
      payload: response
    });
  }
};

export const createMesh = (meshProps, organizerId) => {
  axios.post(`/api/meshes/${organizerId}`, meshProps);
  return { type: CREATE_MESH };
};

export const fetchMeshUsers = meshId => {
  const response = axios.get(`/api/meshes/${meshId}`);
  return {
    type: FETCH_MESH_USERS,
    payload: response
  };
};

export const addMeshUser = (meshId, userId) => {
  axios.put(`/api/meshes/${meshId}/add/${userId}`);
  return { type: ADD_MESH_USER };
};

export const exitMeshUser = (meshId, userId) => {
  axios.put(`/api/meshes/${meshId}/exit/${userId}`);
  return { type: EXIT_MESH_USER };
};

export const fetchMeshOrganizer = meshId => {
  if (!meshId) {
    return {
      type: 'FETCH_MESH_ORGANIZER_FULFILLED',
      payload: {}
    };
  }

  const response = axios.get(`/api/meshes/${meshId}/organizer`);
  return {
    type: FETCH_MESH_ORGANIZER,
    payload: response
  };
};

//////////////////////////////////////////////////////////////////
////////////          ORGANIZER ROUTES             ///////////////
//////////////////////////////////////////////////////////////////
