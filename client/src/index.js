import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
window.axios = axios;

//createStore(reducer, initial state, middleware)
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
 //provider offers state change from redux store 
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);