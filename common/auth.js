const random = require("randomstring");
const emailTemplate = require("../lib/templates");
import Otp from '../models/Otp';

exports.generateOTP = function (type) {
    return (type == "phone" ? Math.floor(100000 + Math.random() * 900000) : random.generate(6));
}

exports.prepareOTPParam = function (type, otp) {
    return ((type == "phone") ? `Dear Customer, Please confirm your phone number to complete your registration. Your verification code is ${otp} and expires in ${process.env.PHONE_OTP_VALID_TIME} minutes.\nThanks,\nThere App Dev Team. ` : emailTemplate.emailTemplate('userRegistration', otp));
}

exports.putOTPIntoCollection = function (user_id, id, otp, dateTime, type) {
    return new Promise((resolve, reject) => {
        let params = (type == "email") ? { user_id: user_id, email: id, email_otp: otp, email_otp_datetime: dateTime } : { user_id: user_id, mobile: id, mobile_otp: otp, mobile_otp_datetime: dateTime };
        Otp.insertMany(params).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
}