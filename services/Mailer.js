const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');
const fetch = require("node-fetch");
const sender = keys.senderKey;

class Mailer extends helper.Mail{
  // when call Mailer func outside, constructor will be the first to execute
  // content: the html string from survey template
  //only detructuring subject and recipients, content is separate, used in line16
   constructor({ subject, recipients}, content) {
    // super: inherit props from helper.Mail
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email(sender.senderKey);
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    //addContent func is also from helper.Mail 
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
   }

   // pass recipients to format func and extract info
   // ** format: ({destructuring part}) => {}
   formatAddresses(recipients) {
    return recipients.map(({email}) => {
      // pass email got here to helper.Email func
      return new helper.Email(email);
    });
   }

   // format func from sendgrid
   addClickTracking() {
     const trackingSettings = new helper.TrackingSettings();
     const clickTracking = new helper.ClickTracking(true, true);

     trackingSettings.setClickTracking(clickTracking);
     this.addTrackingSettings(trackingSettings);
   }

   // get each recipient, add them to the personalized obj
   
   addRecipients(){
     const personalize = new helper.Personalization();
     this.recipients.forEach(recipient => {
       personalize.addTo(recipient);
     });
     // add the personalized recipient to const personalize
     this.addPersonalization(personalize);
   }

   async send() {
    // const request = this.sgApi.emptyRequest({
    //   method: 'POST',
    //   path: '/v3/mail/send',
    //   body: this.toJSON()
    // });
    // const response = await this.sgApi.API(request)
    // .catch(error=>console.error(error));
    // console.log(response);
    // return response;

      const response = await fetch('https://api.sendgrid.com/v3/mail/send',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${keys.sendGridKey}`,
          'Content-Type': 'application/json'
        },
        //this.toJSON will return an object
        // apply JSON.stringfy and transfer it to string
        body: JSON.stringify(this.toJSON())
      });
      // console.log(response);
      return response;
   }

}

module.exports = Mailer;