import { MESHES_ACTIVE } from 'actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case MESHES_ACTIVE:
      console.log('reducer meshesActive: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};
