import APIError from '../../lib/APIError';
import { msg } from '../../lib/messages';
import Order from '../../models/Order';
import Cart from '../../models/Cart';
const HttpStatus = require('http-status-codes');
const helpers = require('../../common/utils');

class OrderService {
    async createOrder(payload, data) {
        try {
            let order = new Order({
                ...data,
                customer_id: payload._id,
            });
            order = await order.save();
            return order;
        } catch (error) {
            throw error;
        }
    }

    async getOrder() {
        try {
            let order = await Order.find({});
            return order;
        } catch (error) {
            throw error;
        }
    }

    async getSingleOrder(orderId) {
        try {
            let result = await Order.findById(orderId);
            console.log(result);
            if (!result) {
                throw new APIError({ message: 'Order does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateOrder(orderId, data) {
        try {
            let result = await Order.findByIdAndUpdate(
                orderId,
                {
                    $set: data
                },
                {
                    new: true
                }
            );
            if (!result) {
                throw new APIError({ message: 'Order does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            let result = await Order.findByIdAndDelete(orderId);
            console.log(result)
            if (!result) {
                throw new APIError({ message: 'Order does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async addToCart(data) {
        try {
            let cart = new Cart({
                ...data,
            });
            cart = await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getCart() {
        try {
            let cart = await Cart.find({});
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getSingleCart(cartId) {
        try {
            let result = await Cart.findById(cartId);
            if (!result) {
                throw new APIError({ message: 'Cart does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, data) {
        try {
            let result = await Cart.findByIdAndUpdate(
                cartId,
                {
                    $set: data
                },
                {
                    new: true
                }
            );
            if (!result) {
                throw new APIError({ message: 'Cart does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(cartId) {
        try {
            let result = await Cart.findByIdAndDelete(cartId);
            if (!result) {
                throw new APIError({ message: 'Cart does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }


}

export default new OrderService();
