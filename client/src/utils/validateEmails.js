const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
 const invalidEmails = emails
  .split(',')
  //trim every email in emails array
  .map(email => email.trim())
  // use re.test to check if email valid, filter returns boolean
  // if not true, filt and return the invalid email
  .filter(email => re.test(email)===false);
  
  if(invalidEmails.length){
    return `These emails are invalid: ${invalidEmails}`
  }

  // if no invalid, return null
  return ;
};