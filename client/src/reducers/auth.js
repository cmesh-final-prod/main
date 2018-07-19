import { CLEAR_STATE, FETCH_AUTH_LINKEDIN_USER } from 'actions/types';

const initialState = {
  status: false,
  data: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case `${FETCH_AUTH_LINKEDIN_USER}_PENDING`:
      return { ...state, status: false };
    case `${FETCH_AUTH_LINKEDIN_USER}_REJECTED`:
      return { ...state, status: false, error: action.payload.message };
    case `${FETCH_AUTH_LINKEDIN_USER}_FULFILLED`:
      if (action.payload.data === '') {
        return {
          ...state,
          status: false,
          data: action.payload.data,
          error: null
        };
      } else {
        return {
          ...state,
          status: true,
          data: action.payload.data,
          error: null
        };
      }
    default:
      return state;
  }
};
