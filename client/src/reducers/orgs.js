import { CREATE_ORG } from 'actions/types';

const initialState = {
  isFetching: false,
  isPopulated: false,
  message: '',
  data: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_ORG}_PENDING`:
      return { ...state, isFetching: true };
    case `${CREATE_ORG}_REJECTED`:
      return { ...state, isFetching: false, error: action.payload };
    case `${CREATE_ORG}_FULFILLED`:
      const { message } = action.payload;
      if (action.payload.created) {
        const { data } = action.payload;
        return {
          ...state,
          isFetching: false,
          isPopulated: true,
          data,
          message
        };
      } else {
        return { ...state, isFetchig: false, isPopulated: false, message };
      }
    default:
      return state;
  }
};
