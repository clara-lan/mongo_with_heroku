import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//lodash: js helper library
import _ from 'lodash';
// Field: redux-form for input 
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Button, Form } from 'react-bootstrap';
import  { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

//use capital letters to stress, do not change this array


class SurveyForm extends Component{
  // render different fields through a func
  renderFields(){
    // get only {label, name} from field item based on the map function
    // can write as _.map(FIELDS, field => {return <Field label={field.label}/>}) 
    return _.map(FIELDS, ({ label, name })=>{
      return (
        <Field key={ name } component={ SurveyField } type="text" label={ label } name={ name }/>
      )
    });
  }
  
  render(){
    return (
      <div>
        <Form style={{ textAlign:"left" }}
        //pass onSurveySubmit to handleSubmit without call onSurveySumit func
        // becase onSurveySubmit only to be called after user submit the form,(after onSubmit is executed)
          onSubmit={this.props.handleSubmit( this.props.onSurveySubmit)}
        >
           { this.renderFields() }
          <br/>
          <div style={{ display:"flex", justifyContent:"space-between"}}>
            <Link to="/surveys" >
              <Button variant="danger" size="sm">
                Cancel
              </Button>
            </Link>
            <p>
            <Button type="submit" variant="info" size="sm">
              NEXT 
              <FontAwesomeIcon icon={ faCheck } style ={{color:'white'}} />
            </Button>
            </p>
          </div>
        </Form>
      </div>
    );
  }
}

function validate(values) {
  // if no errors, the form is validated
  // otherwise redux would return the error 
  const errors = {};

  // init value is empty, inthis case return ' ' (empty strings)
  // put after Line77, will override the united error msg
  errors.recipients = validateEmails(values.recipients || '');


  // also use lodash lib
  _.each(FIELDS,({ name })=>{
    // different return with values.name
    if(!values[name]){
      errors[name] = 'This line cannot be empty.'
    }
  });


  //if errors not empty, will return value of errors
  return errors;

  //plain style without loop
  // if (!values.title) {
  //   // assign title as a prop of errors, with detailed error msg
  //   // not randomly named, need match one of the render part in Field
  //   errors.title = "You must provide a title";
  // }
  // if(!values.subject){
  //   errors.subject = "Subject can not be empty."
  // }
  // if(!values.body){
  //   errors.body= "Title can not be empty."
  // }
  // if(!values.emails){

  // }

  // return errors;
}

export default reduxForm({
  // params for reduxForm
  // old ver: validate: validate,
  validate,
  //name the values in the survey form
  form: 'surveyForm',
  // if true, won't save value when temporarily leave the form
  destroyOnUnmount:false
})(SurveyForm);