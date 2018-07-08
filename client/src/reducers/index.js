import { combineReducers } from 'redux';

// importing reducers
import authReducer from 'reducers/auth';
import meshReducer from 'reducers/mesh';
import selectedReducer from 'reducers/selected';

export default combineReducers({
  auth: authReducer,
  mesh: meshReducer,
  selected: selectedReducer
});
