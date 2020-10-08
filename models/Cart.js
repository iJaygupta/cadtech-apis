const mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    coupon: { name: String },
    discount_total: { type: Number },
    subtotal: { type: Number }
},
    {
        timestamps: true
    }
);


const Cart = mongoose.model('cart', CartSchema);

export default Cart;
