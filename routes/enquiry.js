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
            validator.validateAjv(schema.addEnquiry),
            security.auth.bind(this),
            this.addEnquiry.bind(this)
        );
        this.router.get(
            '/v1/enquiry',
            security.auth.bind(this),
            this.getEnquiry.bind(this)
        );
        this.router.post(
            '/v1/enquiry/contactus',
            validator.validateAjv(schema.contactUs),
            this.contactUs.bind(this)
        );
        this.router.post(
            '/v1/enquiry/team',
            validator.validateAjv(schema.addTeamMember),
            security.auth.bind(this),
            this.addTeamMember.bind(this)
        );
        this.router.get(
            '/v1/enquiry/team',
            security.auth.bind(this),
            this.getTeamMember.bind(this)
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
    async getEnquiry(req, res, next) {
        try {
            const $response = await EnquiryService.getEnquiry(req.body);
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

}

export default EnquiryRoute;
