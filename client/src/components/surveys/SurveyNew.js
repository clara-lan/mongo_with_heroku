// top level of forms, containing survey form and survey form review
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
class SurveyNew extends Component{
  // old way of check component state
  // constructor(props){
  //   super(props);
  //   this.state = {new:true};
  // }

  // use component state to decide whether to show the formreview component
  state = { showFormReview:false};

  renderContent(){
    if(this.state.showFormReview){
      return <SurveyFormReview 
        onCancel = {() => this.setState( {showFormReview:false})}
      />;
    }
    return (
      <SurveyForm 
        onSurveySubmit = {()=>this.setState({showFormReview:true})} 
      />
    );
  }

  render(){
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
}

// compared to SurveyForm.js, no unmount value
// which will clear all values
export default reduxForm({
  form:'surveyForm'
})(SurveyNew);