import User from '../../models/User';
import APIError from '../../lib/APIError';
const bcrypt = require("bcryptjs")

class CourseService {

    async getUserAccountDetails(req) {
        try {
            let { user } = req;
            if (user === null || user === undefined) {
                throw new APIError({ message: msg('Unautorized'), status: 401 });
            }
            user = user.transform();
            if (user.profile) {
                user.profile = user.profile.toObject();
            }
            return user;
        } catch (error) {
            throw error
        }
    }

    async updateUserAccountDetails(payload, data) {
        try {
            let user = await User.findByIdAndUpdate(
                payload._id,
                {
                    $set: data
                },
                {
                    new: true
                }
            );
            user = user.transform();
            return user;
        } catch (error) {
            throw error;
        }
    }
    async updateUserPassword(payload, data) {
        try {
            let { oldPassword, password } = data
            let user = await User.findById({ _id: payload._id });
            if (!user) {
                throw new APIError({ error: true, message: 'Unauthorized', status: 401 });
            } else {
                const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isPasswordMatch) {
                    throw new APIError({ error: true, message: 'Invalid Credentials', status: 401 });
                } else {
                    let hash = bcrypt.hashSync(password);
                    await User.updateOne({ _id: payload._id }, { $set: { 'password': hash } });
                    return user.transform();
                }
            }
        } catch (error) {
            throw error;
        }
    }


}

export default new CourseService();
