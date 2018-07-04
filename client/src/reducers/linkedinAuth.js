import { LINKEDIN_AUTH_USER } from 'actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case LINKEDIN_AUTH_USER:
      console.log('reducer: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};
