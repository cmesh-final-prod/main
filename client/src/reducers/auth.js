import { SIGNIN_ORG, CLEAR_STATE, CREATE_ORG } from "actions/types";

const initialState = {
  token: null,
  isFetching: false,
  isAuth: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return { ...initialState };
    // SIGN IN ORG
    case `${SIGNIN_ORG}_PENDING`:
      return { ...state, isFetching: true };
    case `${SIGNIN_ORG}_REJECTED`:
      return { ...state, isFetching: false, error: action.payload };
    case `${SIGNIN_ORG}_FULFILLED`:
      const { token } = action.payload.data;
      return { ...state, isFetching: false, token, isAuth: true };
    // CREATE ORG
    case `${CREATE_ORG}_PENDING`:
      return { ...state, isFetching: true };
    case `${CREATE_ORG}_REJECTED`:
      return { ...state, isFetching: false, error: action.payload };
    case `${CREATE_ORG}_FULFILLED`:
      const { created } = action.payload.data;
      if (created) {
        const { token } = action.payload.data;
        return {
          ...state,
          isFetching: false,
          isAuth: true,
          token
        };
      } else {
        return {
          ...state,
          isFetching: false,
          isAuth: false,
          error: "email"
        };
      }
    default:
      return state;
  }
};
