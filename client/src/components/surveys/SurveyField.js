//SurveyField contains logic to render a single lable and text input
import React from 'react';
import { Form } from 'react-bootstrap';

//take input/label out of props 
// {...input} means only pass input, which is among other params referring by "..."
export default ({input, label, meta: { error, touched } }) => {
  return (
    <Form >
      <Form.Label>{label}</Form.Label>
      <br/>
      <Form.Control {...input}/>
      {/* if touched is true, means user has clicked without input, pop error
        set up error color*/}
      { touched && <p style={{color:'red'}}>{error}</p>}  
    </Form>
  );
};