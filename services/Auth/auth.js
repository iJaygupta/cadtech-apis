import User from '../../models/User';
import ROLES from '../../models/Roles';
import STATUS from '../../models/Status';
import APIError from '../../lib/APIError';
const HttpStatus = require('http-status-codes');
import msg from '../../lib/messages';
import { emailTemplate } from '../../lib/templates';
const util = require('../../common/auth');
const emailService = require('../../lib/mailer');
const smsService = require('../../lib/sms');
const helpers = require('../../common/utils');



class AuthService {

    async register(data) {
        try {
            data.roles = [ROLES.USER];
            if (await User.isEmailTaken(data.email)) {
                throw new APIError({ message: 'Email already exist', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            if (await User.isMobileTaken(data.mobile)) {
                throw new APIError({ message: 'Mobile already exist', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            const user = new User(data);
            const savedUser = await user.save();
            helpers.sendNotification({ email: user.email, notificationType: `registration`, notificationSubject: `Thanks For Signing Up` });
            return savedUser.transform();
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        try {
            const { userName, password } = data;
            let user = await User.findByCredentials(userName, password);
            if (!user) {
                throw new APIError({
                    message: msg.msg('invalid_creds'),
                    status: HttpStatus.UNAUTHORIZED
                });
            }
            if (user.status === STATUS.BLOCKED) {
                throw new APIError({
                    message: 'Your account has been blocked, please contact Admin !',
                    status: HttpStatus.FORBIDDEN
                });
            }
            const token = await user.generateAuthToken(user);
            user = user.transform();
            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    async sendEmailCode(payload) {
        try {
            let userDetails = await User.findById({ _id: payload._id });
            let { email } = userDetails;
            if (userDetails.is_email_verified) {
                throw new APIError({ message: 'Email Already Verified', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            let OTP = util.generateOTP("email");
            let paramForMsg = util.prepareOTPParam("email", OTP);
            let otpDateTime = new Date();
            await util.putOTPIntoCollection(payload._id, email, OTP, otpDateTime, "email");

            await new Promise((resolve, reject) => {
                emailService.sendEmail(email, "Verification", paramForMsg, function (output) {
                    if (!output.error) {
                        resolve(output);
                    } else {
                        reject({ error: true, message: 'Something Went Wrong', status: HttpStatus.INTERNAL_SERVER_ERROR });

                    }
                })
            })
        } catch (error) {
            throw error;
        }
    }

    async verifyEmailCode(payload, data) {
        try {
            let { email, code } = data
            let otpData = await util.getUserOTP(payload._id, email, "email")
            let OTP = otpData[0] ? otpData[0].email_otp : "";
            let email_otp_datetime = otpData[0] ? otpData[0].email_otp_datetime : ""
            if (OTP == code) {
                if (util.isOTPNotExpired(email_otp_datetime, "email")) {
                    await util.updateVerifyStatus(payload._id, "email", User);
                } else throw new APIError({ message: 'You Provided Expired OTP' });
            } else {
                throw new APIError({ message: 'You Provided Invalid code' });
            }
        } catch (error) {
            throw error;
        }
    }

    async sendPhoneCode(payload) {
        try {
            let userDetails = await User.findById({ _id: payload._id });
            let { mobile } = userDetails;
            if (userDetails.is_mobile_verified) {
                throw new APIError({ message: 'Phone Already Verified', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            let OTP = util.generateOTP("phone");
            let paramForMsg = util.prepareOTPParam("phone", OTP);
            let otpDateTime = new Date();
            await util.putOTPIntoCollection(payload._id, mobile, OTP, otpDateTime, "phone");

            await new Promise((resolve, reject) => {
                smsService.sendMsg(mobile, "Verification", paramForMsg, function (output) {
                    if (!output.error) {
                        resolve(output);
                    } else {
                        reject({ error: true, message: 'Something Went Wrong', status: HttpStatus.INTERNAL_SERVER_ERROR });
                    }
                })
            })
        } catch (error) {
            throw error;
        }
    }

    async verifyMobileCode(payload, data) {
        try {
            let { mobile, code } = data
            let otpData = await util.getUserOTP(payload._id, mobile, "phone")
            let OTP = otpData[0] ? otpData[0].mobile_otp : "";
            let mobile_otp_datetime = otpData[0] ? otpData[0].mobile_otp_datetime : ""
            if (OTP == code) {
                if (util.isOTPNotExpired(mobile_otp_datetime, "phone")) {
                    await util.updateVerifyStatus(payload._id, "phone");
                } else throw new APIError({ message: 'You Provided Expired OTP' });
            } else {
                throw new APIError({ message: 'You Provided Invalid code' });
            }
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword(data) {
        try {
            let { email } = data
            let user = await User.findOne({ email: email });
            if (!user) {
                throw new APIError({
                    message: msg.msg('invalid_creds'),
                    status: HttpStatus.UNAUTHORIZED
                });
            }
            else {
                let securityCode = util.generateOTP("email")
                let otpDateTime = new Date();
                await util.putOTPIntoCollection(user._id, user.email, securityCode, otpDateTime, "email");
                var payload = {
                    id: user._id,
                    email: user.email,
                    securityCode: securityCode
                }
            }
            const token = await util.generateAuthToken(payload);
            const url = `${process.env.HOST}:${process.env.PORT}/api/v1/auth/confirm-forgot-password/${token}`
            const template = emailTemplate('forgotPassword', url);
            await new Promise((resolve, reject) => {
                emailService.sendEmail(user.email, "ForgotPassword", template, function (output) {
                    if (!output.error) {
                        return resolve(output);
                    } else {
                        return reject(output);
                    }
                })
            })
        } catch (error) {
            throw error;
        }
    }

    async confirmForgotPassword(token, res) {
        try {
            const decodedData = util.decodeForgotPasswordToken(res, token);
            if (decodedData) {
                const { id, email, securityCode } = decodedData;
                let otpData = await util.getUserOTP(id, email, "email");
                let OTP = otpData[0] ? otpData[0].email_otp : "";
                let email_otp_datetime = otpData[0] ? otpData[0].email_otp_datetime : "";
                if (OTP == securityCode) {
                    if (util.isOTPNotExpired(email_otp_datetime, "email")) {
                        res.status(200).json({ status: HttpStatus.OK, message: 'Email Successfully Verified.' });
                    } else {
                        throw new APIError({ message: 'The Verification Link has been expired.Please Generate Once More to complete your reset password!' });
                    }
                } else {
                    throw new APIError({ message: 'Oops! Unable to authorize your request for reset password' });
                }
            }
        }
        catch (error) {
            throw error;
        }
    }

}

export default new AuthService();
