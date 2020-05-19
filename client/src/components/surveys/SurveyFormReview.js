import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

// formvalues comes from mapStateToProps func
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) =>{
  //render logic
  const reviewFields = _.map(formFields, ({ name, label}) => {
    return(
      <div key={name}>
        <label> {label} </label>
        <div> {formValues[name]} </div>
        <br />
      </div>
    )
  })
  
  return (
    <div>
      <h5>Confirm entries.</h5>
      
      { reviewFields }

      <button onClick = {onCancel}>
        Go Back
      </button>
      <button
        onClick = { () => submitSurvey(formValues, history)}
      >
        Send Survey
      </button>
    </div>
  );
};

// take redux states and tranfer them into props
function mapStateToProps(state){
  return{ formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));