// use axios to use ajax request
import axios from 'axios';
// do not import as {FETCH_User}
import { FETCH_USER } from './types';

//action creator
// only one function after arrow, so no "return {}" needed for ...dispatch....
export const fetchUser = () => async dispatch => {
  // same as the route in authroutes.js, to verify current user
  //relative path here, so need to edit proxy, check the setupProxy.js in client/src)
  // use promise/async(.then), so only dispatch after the request completed
  const res = await axios.get('/api/current_user');
  dispatch({ type:FETCH_USER, payload:res.data});// res:output from axios
};