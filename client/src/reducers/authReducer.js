import { FETCH_USER } from '../actions/types';

//initial state: null
export default function(state = null, action){
  console.log(action);
  switch(action.type){
    case FETCH_USER:
      return action.payload || false; //if not login, payload will be null, in this case return false
    default:
      return state;
  }
}