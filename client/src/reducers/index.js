import { combineReducers } from "redux";

// importing reducers
import currentUserReducer from "reducers/currentUser";
import meshesReducer from "reducers/meshes";
import selectedMeshReducer from "reducers/selectedMesh";
import orgReducer from "reducers/orgs";
import authReducer from "reducers/auth";

export default combineReducers({
  auth: authReducer,
  currentUser: currentUserReducer,
  meshes: meshesReducer,
  selectedMesh: selectedMeshReducer,
  org: orgReducer
});
