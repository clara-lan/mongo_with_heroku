import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
//get react-redux library to make react works with redux;
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';


class App extends Component{
  componentDidMount(){
    //call at initial of render(only once)
    //when render the component, verify current user, no big difference here with willMount
    
    // calls action
    this.props.fetchUser();
  }

  render(){
    return (
     
      <div className="container" >
        <BrowserRouter>
        {/*has only one child*/}
          <div>
            {/*header here will like text between routes, which will be always visible*/}
            {/* set auth to false, default render "log in with google" */}
            <Header auth={false}/>
            <Route exact path='/' component = {Landing} />
            <Route exact path='/surveys' component = {Dashboard} />
            <Route path='/surveys/new' component={SurveyNew} /> 
          </div>
        </BrowserRouter>
      </div>
    );
  }
};


export default connect(null, actions)(App);