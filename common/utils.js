import { emailTemplate } from '../lib/templates';
const emailService = require('../lib/mailer');

exports.ajvErrors = function (error, callback) {
  let errorField = error[0].dataPath;
  errorField = errorField.split(".");
  errorField = errorField[errorField.length - 1];
  var errMsg = errorField + " " + error[0].message;
  var displayMsg = `The provided value for ${errorField} is not valid`;
  const validationMsg = "Validation Failed For Provided Request";
  return callback(displayMsg);
};


exports.sendNotification = function (param) {
  return new Promise((resolve, reject) => {
    let { email, notificationType, notificationSubject = `CadTech` } = param;
    const template = emailTemplate(notificationType);
    emailService.sendEmail(email, notificationSubject, template, function (output) {
      if (!output.error) {
        resolve(output);
      } else {
        reject(output);
      }
    })
  })
};