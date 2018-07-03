import { combineReducers } from 'redux';

// importing reducers
import testReducer from 'reducers/test';

export default combineReducers({
  test: testReducer
});
