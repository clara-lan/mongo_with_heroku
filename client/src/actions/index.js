// use axios to use ajax request
import axios from 'axios';
import{ FETCH_USER } from './types';

const fetchUser = () => {
 //return a function(axios)
  return function(){
  // same as the route in authroutes.js, to verify current user
  //relative path here, so need to edit proxy, check the setupProxy.js in client/src)
  // use promise/async(.then), so only dispatch after the request completed
  axios.get('/api/current_user')
    .then( res => dispatch({ type:FETCH_USER, payload:res}));
  }
};