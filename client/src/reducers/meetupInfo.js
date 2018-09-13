import { FETCH_MEETUP_GROUP_INFO } from "actions/types";

const initialState = {
  isFetching: false,
  isPopulated: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${MEETUP_GROUP_INFO}_PENDING`:
      return { ...state, isFetching: true };
    case `${MEETUP_GROUP_INFO}_REJECTED`:
      return { ...state, isFetching: false, error: action.payload };
    case `${MEETUP_GROUP_INFO}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        isPopulated: true,
        data: action.payload
      };
    default:
      return state;
  }
};
