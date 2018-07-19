import {
  CLEAR_STATE,
  SELECT_MESH,
  FETCH_MESH_USERS,
  FETCH_MESH_ORGANIZER
} from 'actions/types';

const initialState = {
  isFetching: false,
  isFetched: false,
  isPopulated: false,
  data: {},
  users: [],
  organizer: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case SELECT_MESH:
      if (action.payload.data === undefined) {
        return {
          ...state,
          isFetched: false,
          data: {}
        };
      } else {
        return {
          ...state,
          isFetched: true,
          data: action.payload.data
        };
      }
    case `${FETCH_MESH_USERS}_PENDING`:
      return { ...state, isFetching: true };
    case `${FETCH_MESH_USERS}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case `${FETCH_MESH_USERS}_FULFILLED`:
      if (state.isFetched) {
        return {
          ...state,
          isFetching: false,
          isPopulated: true,
          users: action.payload.data
        };
      } else {
        return state;
      }
    case `${FETCH_MESH_ORGANIZER}_PENDING`:
      return { ...state, isFetching: true };
    case `${FETCH_MESH_ORGANIZER}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case `${FETCH_MESH_ORGANIZER}_FULFILLED`:
      if (state.isFetched) {
        return {
          ...state,
          isFetching: false,
          isPopulated: true,
          organizer: action.payload.data
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
