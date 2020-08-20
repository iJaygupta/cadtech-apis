const random = require("randomstring");
var jwt = require('jsonwebtoken');
const emailTemplate = require("../lib/templates");
import Otp from '../models/Otp';
import User from '../models/User';
const moment = require("moment");
const { sendError } = require('../lib/handleResponse');

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

exports.updateVerifyStatus = function (id, type) {
    return new Promise((resolve, reject) => {
        let params = (type == "email") ? { is_email_verified: true } : { is_phone_verified: true };
        User.updateOne({ _id: id }, { $set: params }).then((data) => {
            resolve()
        }).catch((error) => {
            reject(error);
        })
    })
}

exports.getUserOTP = function (user_id, id, type) {
    return new Promise((resolve, reject) => {
        let params = (type == "phone") ? { user_id: user_id, mobile: id } : { user_id: user_id, email: id };
        let sortKey = (type == "phone") ? { mobile_otp_datetime: -1 } : { email_otp_datetime: -1 }
        Otp.find(params).sort(sortKey).limit(1).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })
}

exports.isOTPNotExpired = (lastOTPSentTime, type) => {
    let timeDiff = calculateTimeDiff(lastOTPSentTime);
    let validTime = type == "email" ? process.env.EMAIL_OTP_VALID_TIME : process.env.PHONE_OTP_VALID_TIME
    if (timeDiff > validTime) {
        return false;
    } else {
        return true;
    }
}

exports.generateAuthToken = function (payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.SECRET_KEY_VALID_TIME) }, function (err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    })
}

exports.decodeForgotPasswordToken = function (response, token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, data) {
        if (err && err.name === 'TokenExpiredError')
            return sendError(response, { message: "The Verification Link has been expired.Please Generate Once More to complete your reset password!" })
        if (err && err.name != 'TokenExpiredError')
            return sendError(response, { message: "Oops! Unable to authorize your request for reset password" })
        return data;
    })
}

const calculateTimeDiff = (lastOTPSentTime) => {
    var now = moment(new Date()); //todays date
    var end = moment(lastOTPSentTime); // another date
    var duration = moment.duration(now.diff(end));
    return duration.asMinutes();
}
