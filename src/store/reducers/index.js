import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import newspapers from './newspaper';

export default combineReducers({
  auth,
  message,
  newspapers
});
