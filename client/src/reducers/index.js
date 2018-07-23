import { combineReducers } from 'redux';

// importing reducers
import currentUserReducer from 'reducers/currentUser';
import meshesReducer from 'reducers/meshes';
import selectedMeshReducer from 'reducers/selectedMesh';

export default combineReducers({
  currentUser: currentUserReducer,
  meshes: meshesReducer,
  selectedMesh: selectedMeshReducer
});
