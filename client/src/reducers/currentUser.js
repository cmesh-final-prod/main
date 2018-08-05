import { CLEAR_STATE, FETCH_CURRENT_USER } from 'actions/types';

const initialState = {
  isAuth: false,
  isFetching: false,
  isCompliant: false,
  data: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case `${FETCH_CURRENT_USER}_PENDING`:
      return { ...state, isFetching: true };
    case `${FETCH_CURRENT_USER}_REJECTED`:
      return {
        ...state,
        isAuth: false,
        isFetching: false,
        error: action.payload.message
      };
    case `${FETCH_CURRENT_USER}_FULFILLED`:
      const { isAuth, isCompliant } = action.payload.data;
      if (isAuth && isCompliant) {
        return {
          ...state,
          isAuth,
          isCompliant,
          isFetching: false,
          data: action.payload.data.user,
          error: null
        };
      } else if (isAuth && !isCompliant) {
        return {
          ...state,
          isAuth,
          isCompliant,
          isFetching: false,
          error: null
        };
      } else {
        return initialState;
      }
    default:
      return state;
  }
};
