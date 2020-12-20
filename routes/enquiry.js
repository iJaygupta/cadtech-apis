import security from '../lib/security';
import EnquiryService from '../services/Enquiry/enquiry';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
const validator = require('../lib/validator');
const schema = require("../schemas/enquiry")

class EnquiryRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/v1/enquiry',
            security.auth.bind(this),
            validator.validateAjv(schema.addEnquiry),
            this.addEnquiry.bind(this)
        );
        this.router.get(
            '/v1/enquiry',
            security.auth.bind(this),
            this.getAllEnquiry.bind(this)
        );
        this.router.post(
            '/v1/enquiry/contactus',
            validator.validateAjv(schema.contactUs),
            this.contactUs.bind(this)
        );
        this.router.post(
            '/v1/enquiry/team',
            security.auth.bind(this),
            validator.validateAjv(schema.addTeamMember),
            this.addTeamMember.bind(this)
        );
        this.router.get(
            '/v1/enquiry/team',
            this.getTeamMember.bind(this)
        );
        this.router.delete(
            '/v1/enquiry/team/:teamId',
            security.auth.bind(this),
            this.deleteTeamMember.bind(this)
        );
        this.router.get(
            '/v1/enquiry/lookup',
            this.getLookUpData.bind(this)
        );
        this.router.post(
            '/v1/enquiry/subscribe',
            validator.validateAjv(schema.contactUs),
            this.addSubscribe.bind(this)
        );
        this.router.get(
            '/v1/enquiry/getSubscribe',
            security.auth.bind(this),
            this.getSubscribedUsers.bind(this)
        );
        this.router.post(
            '/v1/enquiry/certificate/download',
            this.downloadStudentCertificate.bind(this)
        );
        this.router.post(
            '/v1/enquiry/certificates/data/upload',
            this.uploadCsv.bind(this)
        );
        this.router.get(
            '/v1/enquiry/certificates/data',
            this.getBulkData.bind(this)
        );
    }

    async addEnquiry(req, res, next) {
        try {
            const $response = await EnquiryService.addEnquiry(req.body);
            sendSuccess(res, HttpStatus.OK, 2023, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getAllEnquiry(req, res, next) {
        try {
            const $response = await EnquiryService.getAllEnquiry(req.query);
            sendSuccess(res, HttpStatus.OK, 2024, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async contactUs(req, res, next) {
        try {
            const $response = await EnquiryService.contactUs(req.body);
            sendSuccess(res, HttpStatus.OK, 2021, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async addTeamMember(req, res, next) {
        try {
            const $response = await EnquiryService.addTeamMember(req.body);
            sendSuccess(res, HttpStatus.OK, 2022, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getTeamMember(req, res, next) {
        try {
            const $response = await EnquiryService.getTeamMember(req.query);
            sendSuccess(res, HttpStatus.OK, 2025, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async deleteTeamMember(req, res, next) {
        try {
            const $response = await EnquiryService.deleteTeamMember(req.params.teamId);
            sendSuccess(res, HttpStatus.OK, 2034, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getLookUpData(req, res, next) {
        try {
            const $response = await EnquiryService.getLookUpData(req.query);
            sendSuccess(res, HttpStatus.OK, 2027, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async addSubscribe(req, res, next) {
        try {
            const $response = await EnquiryService.addSubscribe(req.body);
            sendSuccess(res, HttpStatus.OK, 2028, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getSubscribedUsers(req, res, next) {
        try {
            const $response = await EnquiryService.getSubscribedUsers(req.query);
            sendSuccess(res, HttpStatus.OK, 2027, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async downloadStudentCertificate(req, res, next) {
        try {
            const $response = await EnquiryService.downloadStudentCertificate(req.body);
            sendSuccess(res, HttpStatus.OK, 2043, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async uploadCsv(req, res, next) {
        try {
            const $response = await EnquiryService.uploadCsv(req, res);
            sendSuccess(res, HttpStatus.OK, 2044, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async getBulkData(req, res, next) {
        try {
            const $response = await EnquiryService.getBulkData(req);
            sendSuccess(res, HttpStatus.OK, 2047, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

}

export default EnquiryRoute;
