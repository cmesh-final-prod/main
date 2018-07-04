import { LINKEDIN_AUTH_USER } from 'actions/types';
import axios from 'axios';

export const linkedinAuthUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  console.log('actions: ', res);
  dispatch({
    type: LINKEDIN_AUTH_USER,
    payload: res.data
  });
};
