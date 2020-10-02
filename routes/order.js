import security from '../lib/security';
import OrdersService from '../services/orders/orders';
import OrderItemsService from '../services/orders/orderItems';
// import orderValidation from '../validations/order.validation'; // create  order schema file and use here for validations


class OrdersRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get(
            '/v1/orders',
            security.checkUserScope.bind(this, security.scope.READ_ORDERS),
            security.auth.bind(this),
            this.getOrders.bind(this)
        );
        this.router.get(
            '/v1/orders/:id',
            security.checkUserScope.bind(this, security.scope.READ_ORDERS),
            this.getSingleOrder.bind(this)
        );
        this.router.post(
            '/v1/orders',
            security.auth.bind(this),
            orderValidation.createOrder.bind(this),
            this.addOrder.bind(this)
        );
        this.router.get(
            '/v1/order-status/:status',
            security.checkUserScope.bind(this, security.scope.READ_ORDERS),
            this.getOrderByStatus.bind(this)
        );
        this.router.put(
            '/v1/orders/:id',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.updateOrder.bind(this)
        );
        this.router.delete(
            '/v1/orders/:id',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.deleteOrder.bind(this)
        );
        this.router.put(
            '/v1/orders/:id/checkout',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.checkoutOrder.bind(this)
        );
        this.router.put(
            '/v1/orders/:id/cancel',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.cancelOrder.bind(this)
        );
        this.router.post(
            '/v1/orders/:id/items',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.addItem.bind(this)
        );
        this.router.put(
            '/v1/orders/:id/items/:item_id',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.updateItem.bind(this)
        );
        this.router.delete(
            '/v1/orders/:id/items/:item_id',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.deleteItem.bind(this)
        );
        this.router.get(
            '/v1/check-order-status/:id',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            this.checkOrderStatus.bind(this)
        );
        // Admin
        this.router.get(
            '/v1/all-orders',
            security.isAdmin.bind(this),
            this.getAllOrders.bind(this)
        );
        this.router.get(
            '/v1/order/:id',
            security.isAdmin.bind(this),
            this.getOrderByAdmin.bind(this)
        );
        this.router.get(
            '/v1/completed-orders',
            security.isAdmin.bind(this),
            this.getAllCompletedOrders.bind(this)
        );
        this.router.get(
            '/v1/completed-order/:id',
            security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
            // security.auth.bind(this),
            this.getSingleCompletedOrder.bind(this)
        );
    }

    async getOrders(req, res, next) {
        try {
            req.query.customer_id = req.user._id;
            const data = await OrdersService.getOrders(req.query);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async getSingleOrder(req, res, next) {
        try {
            console.log('This is testing##################');
            let data = await OrdersService.getSingleOrder(req.params.id);
            console.log('data.invoice_allow=====>', data.invoice_allow);
            // data = data.toObject();
            // data.invoice_allow = 'hellow';
            if (data.invoice_allow) {
                data.invoice_allow = 'true';
            }
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async addOrder(req, res, next) {
        try {
            const data = await OrdersService.addOrder(req.user, req.body);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async getOrderByStatus(req, res, next) {
        try {
            const data = await OrdersService.getOrderByStatus(req.params);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async updateOrder(req, res, next) {
        try {
            const data = await OrdersService.updateOrder(req.params.id, req.body);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const data = await OrdersService.deleteOrder(req.params.id);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async checkoutOrder(req, res, next) {
        try {
            const data = await OrdersService.checkoutOrder(req.params.id);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async cancelOrder(req, res, next) {
        try {
            const data = await OrdersService.cancelOrder(req.params.id);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async addItem(req, res, next) {
        try {
            const data = await OrderItemsService.addItem(req.params.id, req.body);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async updateItem(req, res, next) {
        try {
            const order_id = req.params.id;
            const { item_id } = req.params;
            const data = await OrderItemsService.updateItem(
                order_id,
                item_id,
                req.body
            );
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const order_id = req.params.id;
            const { item_id } = req.params;
            const data = await OrderItemsService.deleteItem(order_id, item_id);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async checkOrderStatus(req, res, next) {
        try {
            let result = await OrdersService.checkOrderStatus(req.params.id);
            response.success(res, result);
        } catch (error) {
            response.error(res, error);
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const data = await OrdersService.getAllOrders(req.query);
            return res.send(data);
        } catch (error) {
            throw error;
        }
    }

    async getOrderByAdmin(req, res, next) {
        try {
            const data = await OrdersService.getOrderByAdmin(req.params.id);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async getSingleCompletedOrder(req, res, next) {
        try {
            const data = await OrdersService.getSingleCompletedOrder(req.params.id);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

    async getAllCompletedOrders(req, res, next) {
        try {
            const data = await OrdersService.getAllCompletedOrders(req.query);
            response.success(res, data);
        } catch (error) {
            response.error(res, error);
        }
    }

}

export default OrdersRoute;