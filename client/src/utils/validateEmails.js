export default (emails) => {
 const emailsArray = emails
  .split(',')
  //trim every email in emails array
  .map(email => email.trim())
  // check if email valid, filter returns boolean
  // .filter(email => )
  ;
};