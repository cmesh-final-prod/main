import { combineReducers } from 'redux';

// importing reducers
import linkedinAuthReducer from 'reducers/linkedinAuth';
import activeMeshesReducer from 'reducers/meshesActive';
import selectedMeshReducer from 'reducers/meshSelected';

export default combineReducers({
  linkedinAuth: linkedinAuthReducer,
  activeMeshes: activeMeshesReducer,
  selectedMesh: selectedMeshReducer
});
