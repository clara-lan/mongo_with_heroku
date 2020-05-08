const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app =>{
  // several funcs could be passed in () and will be executed in line
  app.post('/api/surveys', requireLogin, requireCredits, (req,res) =>{
    // what props we will get from frontend, within the req.body 
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      // split input recipients string and map them as single email
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent:Date.now()
    })

    // send email after create survey
    //passing the survey template in html as the second param
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};