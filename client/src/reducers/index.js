import { combineReducers } from 'redux';
import authReducer from './authReducer';
// rename form reducer as reduxForm
import { reducer as reduxForm } from 'redux-form';
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});