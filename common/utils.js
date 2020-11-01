import { emailTemplate } from '../lib/templates';
const emailService = require('../lib/mailer');
import APIError from '../lib/APIError';
const HttpStatus = require('http-status-codes');
const Ajv = require("ajv");
const ajv = new Ajv();
const schema = require("../schemas/enquiry").bulkUpload;



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


exports.prepareCsvData = function (bulkCsvData) {
  let preparedData = bulkCsvData.map((data) => {
    let validate = ajv.compile(schema);
    if (!validate(data)) {
      exports.ajvErrors(validate.errors, function (errMsg) {
        throw new APIError({ message: validate.errors[0].message, status: HttpStatus.UNPROCESSABLE_ENTITY });
      })
    } else {
      let obj = {};
      obj.registration_id = data["Registration Id"];
      obj.fullName = data["Full Name"];
      obj.grade = data["Grade"];
      obj.course = data["Course"];
      obj.date = new Date(data["Date"]);
      obj.dob = new Date(data["Date Of Birth"]);
      obj.isActive = data["Active"] ? true : false;
      return obj;
    }
  })
  return preparedData;
} 