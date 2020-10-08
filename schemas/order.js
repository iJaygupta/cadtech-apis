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
}