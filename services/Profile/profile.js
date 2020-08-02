import User from '../../models/User';
import APIError from '../../lib/APIError';


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

}

export default new CourseService();
