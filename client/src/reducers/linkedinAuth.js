import { LINKEDIN_AUTH_USER } from 'actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case LINKEDIN_AUTH_USER:
      console.log('reducer: ', action.payload);
      return action.payload || false;
    default:
      return state;
  }
};
