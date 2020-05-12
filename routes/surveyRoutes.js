const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app =>{
  // send msg to customer after clicking the survey
  app.get('/api/surveys/thanks',(req,res) =>{
    res.send('Thanks for voting.');
  });



  // several funcs could be passed in () and will be executed in line
  app.post('/api/surveys', requireLogin, requireCredits, async (req,res) =>{
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
    
    //if anything within try part is wrong, return the error with code 422
    try{
      await mailer.send();
      // responding to async func and save survey info to database
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      //update new user details
      res.send(user);
    }catch(err){
      res.status(422).send(err);
    }
  });
};