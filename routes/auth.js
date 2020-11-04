import security from '../lib/security';
import AuthService from '../services/Auth/auth';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
const validator = require('../lib/validator');
const schema = require("../schemas/auth")
class AuthRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get(
            '/v1/auth/google',
            this.googleLogin.bind(this)
        );
        this.router.post(
            '/v1/auth/register',
            validator.validateAjv(schema.register),
            this.register.bind(this)
        );
        this.router.post(
            '/v1/auth/login',
            validator.validateAjv(schema.login),
            this.login.bind(this)
        );
        this.router.get(
            '/v1/auth/send-email-code',
            security.auth.bind(this),
            this.sendEmailCode.bind(this)
        );
        this.router.post(
            '/v1/auth/verify-email-code',
            security.auth.bind(this),
            validator.validateAjv(schema.verifyEmailCode),
            this.verifyEmailCode.bind(this)
        );
        this.router.get(
            '/v1/auth/send-phone-code',
            security.auth.bind(this),
            this.sendPhoneCode.bind(this)
        );
        this.router.post(
            '/v1/auth/verify-phone-code',
            security.auth.bind(this),
            validator.validateAjv(schema.verifyMobileCode),
            this.verifyMobileCode.bind(this)
        );
        this.router.post(
            '/v1/auth/forgotPassword',
            this.forgotPassword.bind(this)
        );
        this.router.get(
            '/v1/auth/confirm-forgot-password/:token',
            this.confirmForgotPassword.bind(this)
        );
    }

    async googleLogin(req, res, next) {
        try {
            const $response = await AuthService.googleLogin(req.query);
            sendSuccess(res, HttpStatus.OK, 2001, $response);
        } catch (error) {
            sendError(res, error);
        }
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

    async sendEmailCode(req, res, next) {
        try {
            const $response = await AuthService.sendEmailCode(req.user);
            sendSuccess(res, HttpStatus.OK, 2005, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async verifyEmailCode(req, res, next) {
        try {
            const $response = await AuthService.verifyEmailCode(req.user, req.body);
            sendSuccess(res, HttpStatus.OK, 2016, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async sendPhoneCode(req, res, next) {
        try {
            const $response = await AuthService.sendPhoneCode(req.user);
            sendSuccess(res, HttpStatus.OK, 2008, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async verifyMobileCode(req, res, next) {
        try {
            const $response = await AuthService.verifyMobileCode(req.user, req.body);
            sendSuccess(res, HttpStatus.OK, 2026, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async forgotPassword(req, res, next) {
        try {
            const $response = await AuthService.forgotPassword(req.body);
            sendSuccess(res, HttpStatus.OK, 2005, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async confirmForgotPassword(req, res, next) {
        try {
            await AuthService.confirmForgotPassword(req.params.token, res);
        } catch (error) {
            sendError(res, error);
        }
    }

}

export default AuthRoute;
