import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';

import App from './components/App';
import reducers from './reducers';

//createStore(reducer, initial state, middleware)
const store = createStore(reducers, {}, applyMiddleware());

ReactDom.render(
  //provider offers state change from redux store 
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);