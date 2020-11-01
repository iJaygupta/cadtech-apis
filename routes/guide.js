import httpStatus from 'http-status';
import security from '../lib/security';
import GuideService from '../services/Guide/guide';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
const validator = require('../lib/validator');
const schema = require("../schemas/guide")

class GuideRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get(
            '/v1/guide',
            this.getAllGuide.bind(this)
        );
        this.router.post(
            '/v1/guide',
            security.auth.bind(this),
            validator.validateAjv(schema.addGuide),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.addGuide.bind(this)
        );
        this.router.delete(
            '/v1/guide/:id',
            security.auth.bind(this),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.deleteGuide.bind(this)
        );
        this.router.get(
            '/v1/guide/:id',
            this.getSingleGuide.bind(this)
        );
        this.router.put(
            '/v1/guide/:guide_id',
            security.auth.bind(this),
            validator.validateAjv(schema.updateGuide),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.updateGuide.bind(this)
        )

    }
    async getAllGuide(req, res, next) {
        try {
            const $response = await GuideService.getAllGuide();
            sendSuccess(res, HttpStatus.OK, 2048, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async addGuide(req, res, next) {
        try {
            const $response = await GuideService.addGuide(req.body);
            sendSuccess(res, HttpStatus.OK, 2049, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async deleteGuide(req, res, next) {
        try {
            const $response = await GuideService.deleteGuide(req.params.id);
            sendSuccess(res, HttpStatus.OK, 2050, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async getSingleGuide(req, res, next) {
        try {
            const $response = await GuideService.getSingleGuide(req.params.id);
            sendSuccess(res, HttpStatus.OK, 2051, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async updateGuide(req, res, next) {
        try {
            let guideID = req.params.guide_id;
            const $response = await GuideService.updateGuide(guideID, req.body);
            console.log(req.body);
            sendSuccess(res, HttpStatus.OK, 2052, $response);
        }
        catch (error) {
            sendError(res, error);
        }
    }

}

export default GuideRoute;
