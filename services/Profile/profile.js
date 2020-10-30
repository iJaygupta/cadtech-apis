import User from '../../models/User';
import APIError from '../../lib/APIError';
const bcrypt = require("bcryptjs");
const uploader = require("./../../lib/fileHandler");
const HttpStatus = require('http-status-codes');
const resPerPage = process.env.RESPONSE_PER_PAGE || 10;


class ProfileService {

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
        }
        catch (error) {
            throw error;
        }
    }

    async getAllUsers(request, response) {
        try {
            let page = parseInt(request.query.page) || 1;
            let limit, skip, searchKeyword;
            let sort = {};
            if (request.query.sortBy && request.query.orderBy) {
                sort[request.query.sortBy] = request.query.orderBy === 'desc' ? -1 : 1
            }
            if (!(request.query.pagination && request.query.page)) {
                limit = parseInt(request.query.limit) || resPerPage;
                skip = parseInt(request.query.skip) || 0;
                searchKeyword = request.query.searchKeyword || "";
            } else {
                limit = resPerPage;
                skip = (page - 1) * resPerPage
            }
            let populate = {};
            if (searchKeyword) {
                populate["firstName"] = { "$regex": new RegExp(searchKeyword), '$options': 'i' }
            }

            let countData = await User.count();
            let data = await User.find(populate)
                .limit(limit)
                .skip(skip)
                .sort(sort)
            if (data && data.length) {
                let result = {
                    "items": data,
                    "totalRecords": countData,
                    "totalResult": data.length,
                    "pagination": !(request.query.pagination && request.query.page) ? false : "",
                }
                if (request.query.pagination && request.query.page) {
                    result["pagination"] = {
                        "totalRecords": countData,
                        "totalPages": Math.ceil(countData / resPerPage),
                        "currentPage": page,
                        "resPerPage": resPerPage,
                        "hasPrevPage": page > 1,
                        "hasNextPage": page < Math.ceil(countData / resPerPage),
                        "previousPage": page > 1 ? page - 1 : null,
                        "nextPage": page < Math.ceil(countData / resPerPage) ? page + 1 : null
                    }
                } else {
                    if (request.query.limit) {
                        result["limit"] = limit
                    }
                    if (request.query.skip) {
                        result["skip"] = skip
                    }
                }
                return result
            } else {
                return {}
            }
        } catch (error) {
            throw error;
        }
    }

 
    async updateUserStatus( data) {
        try {
            let status = {
                status: data.status
            }
            let user = await User.findByIdAndUpdate(
                data.userId,
                {
                    $set: status
                },
                {
                    new: true
                }
            );
            // user = user.transform();
            return user;
        } catch (error) {
            throw error
        }
    }

}

export default new ProfileService();
