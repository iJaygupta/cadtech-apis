import User from '../../models/User';
import APIError from '../../lib/APIError';
const bcrypt = require("bcryptjs");
const uploader = require("./../../lib/fileHandler");
const HttpStatus = require('http-status-codes');

class CourseService {

    async getUserAccountDetails(req) {
        try {
            let { user } = req;
            if (user === null || user === undefined) {
                throw new APIError({ message: msg('Unautorized'), status: HttpStatus.UNAUTHORIZED });
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

    async addUserProfilePicture(request, response) {
        try {
            let userId = request.user._id;
            await new Promise((resolve, reject) => {
                uploader.uploadFilesLocal("user", "profile", userId, request, response, async function (err, data) {
                    if (err) {
                        reject({ error: true, message: 'Something Went Wrong', status: HttpStatus.INTERNAL_SERVER_ERROR });
                    } else {
                        let localFolderPath = `/Users/jaygupta/Desktop/exercise/cadtech-apis/uploads/user/profile/${userId}`
                        await uploader.uploadFileOnS3("user/profile/" + userId, localFolderPath, request.files[0].filename);
                    }
                })
            })
        } catch (error) {
            throw error;
        }
    }


    async updateUserPassword(payload, data) {
        try {
            let { oldPassword, password } = data
            let user = await User.findById({ _id: payload._id });
            if (!user) {
                throw new APIError({ error: true, message: 'Unauthorized', status: HttpStatus.UNAUTHORIZED });
            } else {
                const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isPasswordMatch) {
                    throw new APIError({ error: true, message: 'Invalid Credentials', status: HttpStatus.UNAUTHORIZED });
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
