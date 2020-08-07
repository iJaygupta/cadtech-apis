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
    async updateUserPassword(user, data) {
        try {
            let { oldPassword, password } = data
            user = await User.findById({ _id: user._id });
            // console.log(user)
            if (!user) {
                throw new APIError({ message: msg("Internal Server Error"), status: 500 });
            } else {
                let users = await bcrypt.compare(oldPassword, data.password, (error, result) => {
                    console.log(users)
                    if (!error) {
                        throw new APIError({ message: 'Internal Server Error', status: 500 });
                    } else if (!result) {
                        throw new APIError({ message: 'Invalid Old Password', status: 500 });
                    } else {
                        users = user.updateOne({ _id: user._id }, { $set: { "password": hash } })
                        if (!data) {
                            throw new APIError({ msg: "Internal Server Error" })
                        } else {
                            return data
                        }
                    }
                })
            }
            user = user.transform();
            return user;
        } catch (error) {
            throw error;
        }
    }


}

export default new CourseService();
