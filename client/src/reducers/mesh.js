import { FETCH_MESHES } from 'actions/types';

const initialState = {
  isFetching: false,
  isFetched: false,
  data: [],
  selectedMeshId: '',
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MESHES}_PENDING`:
      return { ...state, isFetching: true };
    case `${FETCH_MESHES}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload.data
      };
    case `${FETCH_MESHES}_FULFILLED`:
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
