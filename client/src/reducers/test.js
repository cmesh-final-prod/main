import { TEST_CONNECTION } from 'actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case TEST_CONNECTION:
      return action.payload;
    default:
      return state;
  }
};
