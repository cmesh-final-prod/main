import { FETCH_AUTH_LINKEDIN_USER } from 'actions/types';

const initialState = {
  status: false,
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_AUTH_LINKEDIN_USER}_PENDING`:
      return state;
    case `${FETCH_AUTH_LINKEDIN_USER}_FULFILLED`:
      if (action.payload.data === '') {
        return state;
      } else {
        return { ...state, status: true, data: action.payload.data };
      }
    default:
      return state;
  }
};
