"use strict";

var aws = require('aws-sdk');
var keys = require('../config/keys.js');
var config = require('../config');
let awsKeys = keys.awsSecrets;

awsKeys.region = config.ENV === "development" ? keys.awsRegions.dev : keys.awsRegions.main;

let ses = new aws.SES(awsKeys);
module.exports.sendMail = (fromEmail, toEmail, subject, body, callBack) => {
    let email = fromEmail;

   var params = {
     Destination: {
       BccAddresses: [],
       CcAddresses: [],
       ToAddresses: [toEmail]
     },
     Message: {
      Body: {
        Html: {
          Data: body,
          Charset: 'us-ascii'
        },
        Text: {
           Data: 'HTML enabled email client required to read this email.',
           Charset: 'us-ascii'
         },
         Text: {
            Data: 'HTML enabled email client required to read this email.',
            Charset: 'us-ascii'
         }
       },
       Subject: {
         Data: subject,
         Charset: 'us-ascii'
       }
     },

     Source: email,
     ReplyToAddresses: [email]
   };
   if(config.ENV === "production"){
       params.ReplyToAddresses = null;
   }
   ses.sendEmail(params, (err, data) => {
     callBack(err, data);
   });
}

let sender = "rahul@cronj.com";
if(config.ENV != "development"){
    sender = "test@waccal.com";
}
module.exports.mailSender = sender;
