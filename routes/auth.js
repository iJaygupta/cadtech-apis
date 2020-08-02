import security from '../lib/security';
import AuthService from '../services/Auth/auth';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
class AuthRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/v1/auth/register',
            security.checkUserScope.bind(this),
            this.register.bind(this)
        );
        this.router.post(
            '/v1/auth/login',
            security.checkUserScope.bind(this),
            this.login.bind(this)
        );
        this.router.get(
            '/v1/auth/send-phone-code',
            security.checkUserScope.bind(this),
            this.sendPhoneCode.bind(this)
        );
    }

    async register(req, res, next) {
        try {
            const $response = await AuthService.register(req.body);
            sendSuccess(res, HttpStatus.OK, 2000, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async login(req, res, next) {
        try {
            const $response = await AuthService.login(req.body);
            sendSuccess(res, HttpStatus.OK, 2001, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async sendPhoneCode(req, res, next) {
        try {
            const $response = await AuthService.sendPhoneCode(req.body);
            sendSuccess(res, HttpStatus.OK, 2008, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

}

export default AuthRoute;
