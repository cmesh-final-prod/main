import { combineReducers } from 'redux';

// importing reducers
import linkedinAuthReducer from 'reducers/linkedinAuth';

export default combineReducers({
  linkedinAuth: linkedinAuthReducer
});
