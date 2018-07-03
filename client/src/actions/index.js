import { TEST_CONNECTION } from 'actions/types';
import axios from 'axios';

export const testConnection = () => async dispatch => {
  const res = await axios.get('/api/test');

  dispatch({
    type: TEST_CONNECTION,
    payload: res.data
  });
};
