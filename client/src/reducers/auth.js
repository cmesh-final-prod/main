import { AUTH_LINKEDIN } from 'actions/types';

const initialState = {
  status: false,
  linkedin: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${AUTH_LINKEDIN}_PENDING`:
      return state;
    case `${AUTH_LINKEDIN}_FULFILLED`:
      if (action.payload.data === '') {
        return state;
      } else {
        return { ...state, status: true, linkedin: action.payload.data };
      }
    default:
      return state;
  }
};
