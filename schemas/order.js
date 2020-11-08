module.exports = {
    createOrder: {
        "properties": {
            "productId": { "type": ["string", "array"] },
            "customer_id": { "type": ["string"] },
            "coupon": { "type": ["string"] },
            "discount_total": { "type": ["number"] },
            "subtotal": { "type": ["number"] },
            "paid": { "type": ["boolean"] },
            "status": { "type": ["string"] },
        },
        "additionalProperties": false,
    },
    updateOrder: {
        "properties": {
            "coupon": { "type": ["string"] },
            "discount_total": { "type": ["number"] },
            "subtotal": { "type": ["number"] },
            "paid": { "type": ["boolean"] },
            "status": { "type": ["string"] },
        },
        "additionalProperties": false,
    },
    addToCart: {
        "properties": {
            "product_id": { "type": ["string", "array"] },
            "uuid": { "type": ["string"] }
        },
        "additionalProperties": false,
    },
    updateCart: {
        "properties": {
            "coupon": { "type": ["string"] },
            "discount_total": { "type": ["number"] },
            "subtotal": { "type": ["number"] },
        },
        "additionalProperties": false,
    },
}
