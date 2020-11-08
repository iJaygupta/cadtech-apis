const mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
    product_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    coupon: { type: String },
    discount_total: { type: Number },
    subtotal: { type: Number },
    uuid: { type: String, unique: true }
},
    {
        timestamps: true
    }
);


const Cart = mongoose.model('cart', CartSchema);

export default Cart;
