import {
  LINKEDIN_AUTH_USER,
  MESHES_ACTIVE,
  MESH_SELECTED
} from 'actions/types';
import axios from 'axios';

export const fetchLinkedinUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  console.log('actions: ', res.data);

  dispatch({
    type: LINKEDIN_AUTH_USER,
    payload: res.data
  });
};

export const fetchActiveMeshes = () => async dispatch => {
  const res = await axios.get('/api/mesh/active');

  dispatch({
    type: MESHES_ACTIVE,
    payload: res.data
  });
};

export const fetchMeshSelected = id => async dispatch => {
  const res = await axios.post('/api/mesh/selected', { id });

  dispatch({
    type: MESH_SELECTED,
    payoad: res.data
  });
};

export const updateMeshWithNewAttendee = values => async dispatch => {
  const res = await axios.post('/api/mesh/addAttendee', values);

  dispatch({
    type: MESH_SELECTED,
    payload: res.data
  });
};
