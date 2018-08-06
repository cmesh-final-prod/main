import * as T from 'actions/types';
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
    type: T.CLEAR_STATE
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
    type: T.SELECT_MESH,
    payload: selectedMeshProps
  });
};

export const postLocationToStore = (lng, lat) => {
  return {
    type: T.POST_LOCATION_TO_STORE,
    payload: { lng, lat }
  };
};

//////////////////////////////////////////////////////////////////
////////////            USER ROUTES                ///////////////
//////////////////////////////////////////////////////////////////

export const fetchCurrentUser = meshId => dispatch => {
  const response = axios.get(`/api/users/${meshId}`);

  dispatch({
    type: T.FETCH_CURRENT_USER,
    payload: response
  });
};

export const associateOrgWithUser = (userId, orgId) => {
  axios.put(`/api/users/${userId}/add/${orgId}`);
  return { type: T.ASSOCIATE_ORG_WITH_USER };
};

export const editUserInfo = (userId, userInfoProps) => {
  axios.put(`/api/users/edit/${userId}`, userInfoProps);
  return { type: T.EDIT_USER_INFO };
};

//////////////////////////////////////////////////////////////////
////////////             MESH ROUTES               ///////////////
//////////////////////////////////////////////////////////////////

export const fetchMeshes = (lng, lat) => dispatch => {
  if (lng && lat) {
    const response = axios.get(`/api/meshes?lng=${lng}&lat=${lat}`);
    dispatch({
      type: T.FETCH_MESHES,
      payload: response
    });
  }
};

export const createMesh = (meshProps, orgId) => {
  axios.post(`/api/meshes/${orgId}`, meshProps);
  return { type: T.CREATE_MESH };
};

export const fetchMeshUsers = meshId => {
  const response = axios.get(`/api/meshes/${meshId}`);
  return {
    type: T.FETCH_MESH_USERS,
    payload: response
  };
};

export const addMeshUser = (meshId, userId) => {
  axios.put(`/api/meshes/${meshId}/add/${userId}`);
  return { type: T.ADD_MESH_USER };
};

export const exitMeshUser = (meshId, userId) => {
  axios.put(`/api/meshes/${meshId}/exit/${userId}`);
  return { type: T.EXIT_MESH_USER };
};

export const addMeshFeedback = (meshId, userId, feedbackProps) => {
  axios.put(`/api/meshes/${meshId}/feedback/${userId}`, feedbackProps);
  return { type: T.ADD_MESH_FEEDBACK };
};

//////////////////////////////////////////////////////////////////
////////////              ORG ROUTES               ///////////////
//////////////////////////////////////////////////////////////////

export const createOrg = async orgProps => {
  const response = await axios.post('/api/orgs', orgProps);
  return {
    type: T.CREATE_ORG,
    payload: response
  };
};

// export const fetchMeshOrganizer = meshId => {
//   if (!meshId) {
//     return {
//       type: 'FETCH_MESH_ORGANIZER_FULFILLED',
//       payload: {}
//     };
//   }
//
//   const response = axios.get(`/api/meshes/${meshId}/organizer`);
//   return {
//     type: T.FETCH_MESH_ORGANIZER,
//     payload: response
//   };
// };
