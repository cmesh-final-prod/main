import { FETCH_MESHES, POST_LOCATION_TO_STORE } from 'actions/types';

const initialState = {
  isFetching: true,
  isPopulated: false,
  isLocated: false,
  data: [],
  location: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOCATION_TO_STORE:
      return { ...state, isLocated: true, location: action.payload };
    case `${FETCH_MESHES}_PENDING`:
      return { ...state, isFetching: true, isPopulated: false };
    case `${FETCH_MESHES}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        isPopulated: false,
        error: action.payload
      };
    case `${FETCH_MESHES}_FULFILLED`:
      if (action.payload.data.isFound) {
        return {
          ...state,
          isFetching: false,
          isPopulated: true,
          data: action.payload.data.publicInfo
        };
      } else {
        return {
          ...state,
          isFetching: false,
          isPopulated: false
        };
      }

    default:
      return state;
  }
};
