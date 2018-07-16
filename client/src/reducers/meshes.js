import { FETCH_MESHES } from 'actions/types';

const initialState = {
  isFetching: false,
  isPopulated: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
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
      if (action.payload.data.length === 0) {
        return {
          ...state,
          isFetching: false,
          data: action.payload.data
        };
      } else {
        return {
          ...state,
          isFetching: false,
          isPopulated: true,
          data: action.payload.data
        };
      }

    default:
      return state;
  }
};
