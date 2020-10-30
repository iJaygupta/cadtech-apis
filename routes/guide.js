import security from '../lib/security';
import GuideService from '../services/Guide/guide';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
const validator = require('../lib/validator');
const schema = require("../schemas/profile")

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
    }

  
    async getAllGuide(req, res, next) {
        try {
            const $response = await GuideService.getAllGuide(req.body);
            sendSuccess(res, HttpStatus.OK, 2048, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default GuideRoute;
