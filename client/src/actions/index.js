// import { TEST_CONNECTION } from 'actions/types';
// import axios from 'axios';
//
// export const testConnection = () => async dispatch => {
//   const res = await axios.get('/api/test');
//
//   dispatch({
//     type: TEST_CONNECTION,
//     payload: res.data
//   });
// };

// ---------------

import { TEST_CONNECTION, AUTH_USER } from 'actions/types';
import axios from 'axios';

export const testConnection = () => async dispatch => {
  const response = await axios.get('/api/test');
  console.log(response.data);

  dispatch({
    type: TEST_CONNECTION,
    payload: response.data
  });
};

export const authUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');
  console.log('actions auth: ', response.data);
  dispatch({
    type: AUTH_USER,
    payload: response.data
  });
};
