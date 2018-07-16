import { combineReducers } from 'redux';

// importing reducers
import authReducer from 'reducers/auth';
import meshesReducer from 'reducers/meshes';
import selectedMeshReducer from 'reducers/selectedMesh';

export default combineReducers({
  auth: authReducer,
  meshes: meshesReducer,
  selectedMesh: selectedMeshReducer
});
