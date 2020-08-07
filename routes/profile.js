import security from '../lib/security';
import ProfileService from '../services/Profile/profile';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');

class CourseRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get(
            '/v1/profile',
            security.auth.bind(this),
            this.getUserAccountDetails.bind(this)
        );
        this.router.put(
            '/v1/profile',
            security.auth.bind(this),
            this.updateUserAccountDetails.bind(this)
        );
        this.router.put(
            '/v1/profile/changePassword',
            security.auth.bind(this),
            this.updateUserPassword.bind(this)
        );
    }

    async getUserAccountDetails(req, res, next) {
        try {
            const $response = await ProfileService.getUserAccountDetails(req);
            sendSuccess(res, HttpStatus.OK, 2013, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateUserAccountDetails(req, res, next) {
        try {
            const $response = await ProfileService.updateUserAccountDetails(req.user, req.body);
            sendSuccess(res, HttpStatus.OK, 2014, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async updateUserPassword(req, res, next) {
        try {
            const $response = await ProfileService.updateUserPassword(req.user, req.body);
            sendSuccess(res, HttpStatus.OK, 2015, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

}

export default CourseRoute;
