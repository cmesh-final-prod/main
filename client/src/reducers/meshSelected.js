import { MESH_SELECTED } from 'actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case MESH_SELECTED:
      return action.payload;
    default:
      return state;
  }
};
