import security from '../lib/security';
import EnquiryService from '../services/Enquiry/enquiry';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');

class EnquiryRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/v1/enquiry',
            security.auth.bind(this),
            this.addEnquiry.bind(this)
        );
        this.router.post(
            '/v1/enquiry/contactus',
            security.auth.bind(this),
            this.contactUs.bind(this)
        );
        this.router.post(
            '/v1/enquiry/team',
            security.auth.bind(this),
            this.addTeamMember.bind(this)
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

}

export default EnquiryRoute;