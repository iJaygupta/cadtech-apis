const mongoose = require("mongoose");
const STATUS = require('./Status');

let orderStatus = [STATUS.ORDER_DRAFT,
STATUS.ORDER_AWAIT_FULFILMENT,
STATUS.ORDER_AWAIT_PAYMENT,
STATUS.ORDER_CANCELLED,
STATUS.ORDER_DECLINED,
STATUS.ORDER_PLACED,
STATUS.ORDER_REFUNDED,
STATUS.ORDER_SHIPPING,
STATUS.ORDER_FULFILLED,
STATUS.ORDER_DRAFT,
STATUS.ORDER_PLACED];


var OrderSchema = new mongoose.Schema({
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    coupon: { type: String },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: String, enum: orderStatus },
    paid: { type: Boolean, default: false },
    discount_total: { type: Number },
    subtotal: { type: Number }


},
    {
        timestamps: true
    }
);


const Order = mongoose.model('order', OrderSchema);

export default Order;
