import { CLEAR_STATE, FETCH_ORG, FETCH_ORG_MESHES } from "actions/types";

const initialState = {
  isFetching: false,
  isFetched: false,
  isPopulated: false,
  orgId: null,
  data: {},
  orgMeshes: [],
  error: null,
  isEmailError: false,
  isAuthError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return { ...initialState };
    case `${FETCH_ORG}_PENDING`:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isPopulated: false
      };
    case `${FETCH_ORG}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        isFetched: false,
        isPopulated: false
      };
    case `${FETCH_ORG}_FULFILLED`:
      const { data, orgId } = action.payload.data;
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        data,
        orgId
      };
    case `${FETCH_ORG_MESHES}_PENDING`:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isPopulated: false
      };
    case `${FETCH_ORG_MESHES}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        isFetched: false,
        isPopulated: false
      };
    case `${FETCH_ORG_MESHES}_FULFILLED`:
      const { orgMeshes } = action.payload.data;
      return { ...state, isFetching: false, isPopulated: true, orgMeshes };
    default:
      return state;
  }
};
