import User from '../../models/User';
import ROLES from '../../models/Roles';
import STATUS from '../../models/Status';
import APIError from '../../lib/APIError';



class AuthService {

    async register(data) {
        try {
            data.roles = [ROLES.USER];
            if (await User.isEmailTaken(data.email)) {
                throw new APIError({ message: 'Email already exist', status: 422 });
            }
            if (await User.isMobileTaken(data.mobile_number)) {
                throw new APIError({
                    message: 'Mobile Number already exist',
                    status: 422
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
                    message: msg('invalid_creds'),
                    status: HTTP_STATUS.UNAUTHORIZED
                });
            }
            if (user.status === STATUS.BLOCKED) {
                throw new APIError({
                    message: 'You account has been blocked, please contact Admin !',
                    status: HTTP_STATUS.FORBIDDEN
                });
            }
            const token = await user.generateAuthToken(user);
            user = user.transform();
            return { user, token };
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
