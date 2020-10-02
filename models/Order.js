const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Address = require('./Address');
const STATUS = require('./status');

let orderStatus = [
    STATUS.ORDER_DRAFT,
    STATUS.ORDER_AWAIT_FULFILMENT,
    STATUS.ORDER_AWAIT_PAYMENT,
    STATUS.ORDER_CANCELLED,
    STATUS.ORDER_DECLINED,
    STATUS.ORDER_PLACED,
    STATUS.ORDER_REFUNDED,
    STATUS.ORDER_SHIPPING,
    STATUS.ORDER_FULFILLED,
    STATUS.ORDER_DRAFT,
    STATUS.ORDER_PLACED
];

let schema = new mongoose.Schema(
    {
        date_placed: Date,
        date_closed: Date,
        date_paid: Date,
        date_cancelled: Date,
        number: Number,
        shipping_status: String,
        order_type: {
            type: String,
            enum: [ORDERTYPE.SELL, ORDERTYPE.RESELL],
            default: ORDERTYPE.SELL
        },
        resell_id: String,
        commission: Number,
        items: [
            {
                variant_name: String,
                product_name: String,
                images: [
                    {
                        url: String,
                        filename: String,
                        alt: String
                    }
                ],
                resell_price: Number,
                regular_price: Number,
                sale_price: Number,
                discount_percentage: Number,
                discount_price: Number,
                features: [{ value: String }],
                quantity: Number,
                variant_value: String,
                product_id: { type: mongoose.Types.ObjectId, ref: 'Product' },
                variant_id: { type: String },
                is_confirm: { type: Boolean, default: false },
                shop_id: { type: mongoose.Types.ObjectId, ref: 'Shop' },
                dispute_id: {
                    type: mongoose.Types.ObjectId
                },
                notes: [logTemplate.messageTemplate],
                status: {
                    type: String,
                    enum: orderStatus,
                    default: STATUS.ORDER_DRAFT
                },
                paid: { type: Boolean, default: false },
                date_paid: Date,
                tax: { type: Number, default: 0 }
            }
        ],
        notes: [logTemplate.messageTemplate],
        paid: { type: Boolean, default: false },
        coupon: { name: String, value: Number },
        customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: orderStatus },
        payment_details: {},
        discount_total: { type: Number },
        subtotal: { type: Number },
        shipping_total: { type: Number },
        grand_total: { type: Number }
    },
    {
        timestamps: true
    }
);

schema.statics = {
    async list({ page = 1, perPage = 30, keyword }) {
        try {
            let options = {};
            if (keyword) {
                options = { name: { $regex: `.*${keyword}.*` } };
            }

            const data = await this.find(options)
                .sort({ name: -1 })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .populate({ path: 'country', model: Country })
                .exec();
            const totalRecords = await this.count(options).exec();
            return {
                total: totalRecords,
                data
            };
        } catch (error) {
            throw error;
        }
    },

    async get(id) {
        try {
            let model;
            if (mongoose.Types.ObjectId.isValid(id)) {
                model = await this.findById(id).exec();
            }
            return model;
        } catch (error) {
            throw error;
        }
    },

    async updateModel(id, data) {
        // eslint-disable-next-line no-return-await
        return await this.findOneAndUpdate(
            {
                _id: id
            },
            data,
            {
                upsert: true,
                new: true
            }
        ).exec();
    },
    async removeModel(id) {
        // eslint-disable-next-line no-return-await
        return await this.find({ _id: id })
            .deleteOne()
            .exec();
    },
    async getDraftOrder(userId) {
        try {
            let order = await this.findOne({
                customer_id: userId,
                'items.status': STATUS.ORDER_DRAFT
            });
            return order;
        } catch (error) {
            throw error;
        }
    }
};

schema.plugin(mongoosePaginate);
const Order = mongoose.model('Order', schema);

export default Order;