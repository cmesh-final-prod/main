import { SELECT_MESH } from 'actions/types';

const initialState = {
  isFetching: false,
  isFetched: false,
  meshId: null,
  data: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MESH:
      return { ...state, meshId: action.payload };
    case `${SELECT_MESH}_PENDING`:
      return { ...state, isFetching: true };
    case `${SELECT_MESH}_REJECTED`:
      return { ...state, isFetching: false, error: action.payload };
    case `${SELECT_MESH}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        data: action.payload.data
      };
    default:
      return state;
  }
};
