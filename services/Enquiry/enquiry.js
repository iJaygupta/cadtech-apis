import APIError from '../../lib/APIError';
import { msg } from '../../lib/messages';
import ContactUs from '../../models/ContactUs';
import StudentCertificates from '../../models/StudentCertificates';
import Team from '../../models/Team';
import Common from '../../models/Common';
import Enquiry from '../../models/Enquiry';
const HttpStatus = require('http-status-codes');
const helpers = require('../../common/utils');
const convertHtmlToPdf = require('../../lib/pdfConverter').convertHtmlToPdf;
var rimraf = require('rimraf');
var uploader = require("./../../lib/fileHandler");
var XLSX = require('xlsx');
const resPerPage = process.env.RESPONSE_PER_PAGE || 4;


class EnquiryService {

    async addEnquiry(data) {
        try {
            let enquiry = new Enquiry({
                ...data
            });
            enquiry = await enquiry.save();
            return enquiry;
        } catch (error) {
            throw error;
        }
    }
    async getEnquiry() {
        try {
            let enquiry = await Enquiry.find({});
            return enquiry;
        } catch (error) {
            throw error;
        }
    }

    async contactUs(data) {
        try {
            const { email, name, subject, message } = data;
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!emailRegex.test(email)) throw new APIError({ message: msg("please enter a valid email"), status: HttpStatus.UNPROCESSABLE_ENTITY })

            let contactus = new ContactUs({
                email,
                name,
                subject,
                message
            });
            contactus = await contactus.save();
            helpers.sendNotification({ email, notificationType: `contactUs`, notificationSubject: `Thanks For Contacting Us` });
            return contactus;
        } catch (error) {
            throw error;
        }

    }

    async addTeamMember(data) {
        try {
            let teamMember = new Team({
                ...data
            });
            teamMember = await teamMember.save();
            return teamMember
        } catch (error) {
            throw error;
        }
    }
    async getTeamMember() {
        try {
            let teamMember = await Team.find({});
            return teamMember;
        } catch (error) {
            throw error;
        }
    }
    async deleteTeamMember(teamId) {
        try {
            let result = await Team.findByIdAndDelete(teamId);
            console.log(result)
            if (!result) {
                throw new APIError({ message: 'TeamMember does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }


    async getLookUpData() {
        try {
            let commonData = await Common.find({});
            return commonData;
        } catch (error) {
            throw error;
        }
    }

    async addSubscribe(data) {
        try {
            const { email } = data;
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!emailRegex.test(email)) throw new APIError({ message: msg("please enter a valid email"), status: HttpStatus.UNPROCESSABLE_ENTITY })

            let subcribe = new ContactUs({
                email,
                slug: 'subscribe'
            });
            subcribe = await subcribe.save();
            helpers.sendNotification({ email, notificationType: `subscribe`, notificationSubject: `Thanks For Subscribing CadTech` });
            return subcribe;
        } catch (error) {
            throw error;
        }
    }

    async getSubscribedUsers() {
        try {
            let subscribeUser = await ContactUs.find({ slug: "subscribe" });
            return subscribeUser;
        } catch (error) {
            throw error;
        }
    }

    async downloadStudentCertificate(data) {
        try {
            let { registration_id } = data;
            let certificateData = await StudentCertificates.find({ registration_id });
            if (!certificateData.length) {
                throw new APIError({ message: 'Certificate has not been issued to provided registration number', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            let certificateURL = await convertHtmlToPdf(certificateData[0]);
            return certificateURL;
        } catch (error) {
            throw error;
        }
    }

    async uploadCsv(request, response) {
        try {
            let data = await this.bulkUpload(request, response)
            data = helpers.prepareCsvData(data);
            let bulWriteQuery = this.prepareDataForBulkUpload(data);
            await StudentCertificates.bulkWrite(bulWriteQuery);
        }
        catch (error) {
            throw error;
        }
    }


    bulkUpload(request, response) {
        return new Promise((resolve, reject) => {
            uploader.uploadFilesLocal("user", "cetificate", 1, request, response, function (err, data) {
                if (err) {
                    reject({ message: 'Something Went Wrong', status: HttpStatus.INTERNAL_SERVER_ERROR });
                } else {
                    if (request.files && request.files[0]) {
                        var file = request.files[0];
                        var workbook = XLSX.readFile(file.path);
                        rimraf(file.destination, function () { });
                        if (workbook && workbook.SheetNames && workbook.SheetNames[0] && workbook.Sheets[workbook.SheetNames[0]]) {
                            var data = uploader.readBulkFile(workbook.Sheets[workbook.SheetNames[0]]);
                            if (data.length) {
                                resolve(data);
                            } else {
                                reject({
                                    message: 'You Are Trying To Upload Empty File. Please try again later', status: HttpStatus.UNPROCESSABLE_ENTITY
                                });
                            }
                        } else {
                            reject({
                                message: 'Unable to process uploaded file. Please try again later', status: HttpStatus.UNPROCESSABLE_ENTITY
                            });
                        }
                    } else {
                        reject({
                            message: 'Attached file not found, please try again', status: HttpStatus.UNPROCESSABLE_ENTITY
                        });
                    }
                }
            })
        })
    }

    prepareDataForBulkUpload(data) {
        let bulkWriteQuery = [];
        bulkWriteQuery = data.map((el, index) => {
            return {
                updateOne: {
                    "filter": { registration_id: el.registration_id },
                    "update": { $set: el },
                    "upsert": true
                }
            }
        })
        return bulkWriteQuery;
    }

    async getBulkData(request) {
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
                populate["fullName"] = { "$regex": new RegExp(searchKeyword), '$options': 'i' }
            }

            let countData = await StudentCertificates.count();
            let data = await StudentCertificates.find(populate)
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
}

export default new EnquiryService();
