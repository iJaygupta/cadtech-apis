import APIError from '../../lib/APIError';
import { msg } from '../../lib/messages';
import Order from '../../models/Order';
import Cart from '../../models/Cart';
const HttpStatus = require('http-status-codes');
const helpers = require('../../common/utils');
const resPerPage = process.env.RESPONSE_PER_PAGE || 15;

class OrderService {

    async addToCart(data) {
        let uuid = data.uuid;
        try {
            let result = await Cart.updateOne(
                { uuid },
                {
                    $addToSet: { "product_id": data.product_id }
                },
                {
                    upsert: true
                }
            );
            return result;
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

    async getCartProducts(uuid) {
        try {
            let result = await Cart.findOne({ uuid }).populate('product_id');
            if (!result) {
                throw new APIError({ message: 'Cart does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

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

    async getAllOrder(query) {
        try {
            let filters = {};
            let page = parseInt(query.page) || 1;
            let limit, skip, searchKeyword;
            let sort = {};

            if (query.sortBy && query.orderBy) {
                sort[query.sortBy] = query.orderBy === 'desc' ? -1 : 1
            }
            if (!(query.pagination && query.page)) {
                limit = parseInt(query.limit) || resPerPage;
                skip = parseInt(query.skip) || 0;
                searchKeyword = query.searchKeyword || "";
            } else {
                limit = resPerPage;
                skip = (page - 1) * resPerPage
            }
            if (searchKeyword) {
                filters["name"] = { "$regex": new RegExp(searchKeyword), '$options': 'i' }
            }
            let countData = await Order.count();
            let data = await Order.find(filters)
                .populate("customer_id", "firstName")
                .populate("productId", "name")
                .limit(limit)
                .skip(skip)
                .sort(sort)
            if (data && data.length) {
                let result = {
                    "items": data,
                    "totalRecords": countData,
                    "totalResult": data.length,
                    "pagination": !(query.pagination && query.page) ? false : "",
                }
                if (query.pagination && query.page) {
                    result["pagination"] = {
                        "totalRecords": countData,
                        "totalPages": Math.ceil(countData / resPerPage),
                        "currentPage": page,
                        "resPerPage": resPerPage,
                        "hasPrevPage": page > 1,
                        "hasNextPage": page < Math.ceil(countData / resPerPage),
                        "previousPage": page > 1 ? page - 1 : null,
                        "nextPage": page < Math.ceil(countData / resPerPage) ? page + 1 : null
                    }
                } else {
                    if (query.limit) {
                        result["limit"] = limit
                    }
                    if (query.skip) {
                        result["skip"] = skip
                    }
                }
                return result
            } else {
                return {}
            }
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




}

export default new OrderService();
