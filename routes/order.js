import security from '../lib/security';
import OrdersService from '../services/Order/order';
// import orderValidation from '../validations/order.validation'; // create  order schema file and use here for validations
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
const validator = require('../lib/validator');
const schema = require("../schemas/order");



class OrdersRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get(
            '/v1/order',
            security.auth.bind(this),
            this.getOrder.bind(this)
        );
        this.router.get(
            '/v1/order/:orderId',
            security.auth.bind(this),
            this.getSingleOrder.bind(this)
        );
        this.router.post(
            '/v1/order',
            security.auth.bind(this),
            validator.validateAjv(schema.createOrder),
            this.createOrder.bind(this)
        );
        this.router.put(
            '/v1/order/:orderId',
            security.auth.bind(this),
            this.updateOrder.bind(this)
        );
        this.router.delete(
            '/v1/order/:orderId',
            security.auth.bind(this),
            this.deleteOrder.bind(this)
        );
        this.router.get(
            '/v1/cart',
            this.getCart.bind(this)
        );
        this.router.get(
            '/v1/cart/:cartId',
            this.getSingleCart.bind(this)
        );
        this.router.post(
            '/v1/cart',
            this.addToCart.bind(this)
        );
        this.router.put(
            '/v1/cart/:cartId',
            this.updateCart.bind(this)
        );
        this.router.delete(
            '/v1/cart/:cartId',
            this.deleteCart.bind(this)
        );

    }
    async createOrder(req, res, next) {
        try {
            const $response = await OrdersService.createOrder(req.user, req.body);
            sendSuccess(res, HttpStatus.OK, 2035, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async getOrder(req, res, next) {
        try {
            const $response = await OrdersService.getOrder(req.query);
            sendSuccess(res, HttpStatus.OK, 2036, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async getSingleOrder(req, res, next) {
        try {
            const $response = await OrdersService.getSingleOrder(req.params.orderId);
            sendSuccess(res, HttpStatus.OK, 2036, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async updateOrder(req, res, next) {
        try {
            const $response = await OrdersService.updateOrder(req.params.orderId, req.body);
            sendSuccess(res, HttpStatus.OK, 2037, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async deleteOrder(req, res, next) {
        try {
            const $response = await OrdersService.deleteOrder(req.params.orderId);
            sendSuccess(res, HttpStatus.OK, 2038, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async addToCart(req, res, next) {
        try {
            const $response = await OrdersService.addToCart(req.body);
            sendSuccess(res, HttpStatus.OK, 2039, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async getCart(req, res, next) {
        try {
            const $response = await OrdersService.getCart(req.query);
            sendSuccess(res, HttpStatus.OK, 2040, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async getSingleCart(req, res, next) {
        try {
            const $response = await OrdersService.getSingleCart(req.params.cartId);
            sendSuccess(res, HttpStatus.OK, 2040, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async updateCart(req, res, next) {
        try {
            const $response = await OrdersService.updateCart(req.params.cartId, req.body);
            sendSuccess(res, HttpStatus.OK, 2041, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
    async deleteCart(req, res, next) {
        try {
            const $response = await OrdersService.deleteCart(req.params.cartId);
            sendSuccess(res, HttpStatus.OK, 2042, $response);
        } catch (error) {
            sendError(res, error);
        }
    }



}

export default OrdersRoute;