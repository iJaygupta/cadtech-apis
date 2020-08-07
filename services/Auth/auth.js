import User from '../../models/User';
import ROLES from '../../models/Roles';
import STATUS from '../../models/Status';
import APIError from '../../lib/APIError';
const HttpStatus = require('http-status-codes');
import msg from '../../lib/messages';
const util = require('../../common/auth');
const emailService = require('../../lib/mailer');


class AuthService {

    async register(data) {
        try {
            data.roles = [ROLES.USER];
            if (await User.isEmailTaken(data.email)) {
                throw new APIError({ message: 'Email already exist', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            if (await User.isMobileTaken(data.mobile_number)) {
                throw new APIError({
                    message: 'Mobile Number already exist',
                    status: HttpStatus.UNPROCESSABLE_ENTITY
                });
            }
            const user = new User(data);
            const savedUser = await user.save();
            return savedUser.transform();
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        try {
            const { email, password } = data;
            let user = await User.findByCredentials(email, password);
            if (!user) {
                throw new APIError({
                    message: msg.msg('invalid_creds'),
                    status: HttpStatus.UNAUTHORIZED
                });
            }
            if (user.status === STATUS.BLOCKED) {
                throw new APIError({
                    message: 'You account has been blocked, please contact Admin !',
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

    async sendPhoneCode() {
        try {
            let user = await User.find({});
            return user
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService();
