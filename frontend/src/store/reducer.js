import { combineReducers } from 'redux';
import authReducer from './login/authReducer';
import mailReducer from './mails/mailReducer';

export default combineReducers({
  user: authReducer,
  mails: mailReducer,
});
