import security from '../lib/security';
import ProfileService from '../services/Profile/profile';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
const validator = require('../lib/validator');
const schema = require("../schemas/profile")

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
        this.router.get(
            '/v1/profile/all',
            security.auth.bind(this),
            this.getAllUsers.bind(this)
        );
        this.router.put(
            '/v1/profile',
            security.auth.bind(this),
            validator.validateAjv(schema.updateUserAccountDetails),
            this.updateUserAccountDetails.bind(this)
        );
        this.router.post(
            '/v1/profile/picture',
            security.auth.bind(this),
            this.addUserProfilePicture.bind(this)
        );
        this.router.put(
            '/v1/profile/changepassword',
            security.auth.bind(this),
            validator.validateAjv(schema.updateUserPassword),
            this.updateUserPassword.bind(this)
        );
        this.router.put(
            '/v1/profile/status',
            //security.auth.bind(this),
            validator.validateAjv(schema.updateUserStatus),
            this.updateUserStatus.bind(this)
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

    async addUserProfilePicture(req, res, next) {
        try {
            const $response = await ProfileService.addUserProfilePicture(req, res);
            sendSuccess(res, HttpStatus.OK, 2015, $response);
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

    async getAllUsers(req, res, next) {
        try {
            const $response = await ProfileService.getAllUsers(req, res);
            sendSuccess(res, HttpStatus.OK, 2045, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateUserStatus(req, res, next) {
        try {
            const $response = await ProfileService.updateUserStatus(req.body);
            sendSuccess(res, HttpStatus.OK, 2046, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default CourseRoute;
