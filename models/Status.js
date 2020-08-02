const STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
    BLOCKED: 2,
    ACCOUNT_SELLER_NOT_APPROVED: 3,

    RIDER_AVAILABLE: 3,
    RIDER_DROPPING: 4,
    RIDER_OFF: 5,
    NA: -1,

    SHIPPING_NOT_STARTED: 20,
    SHIPPING_PROGRESS: 21,
    SHIPPING_RETURN: 22,
    SHIPPING_COMPLETE: 23,
    SHIPPING_REJECT: 24,
    RIDER_SHIPMENT_ACCEPTED: 25, // when rider assigned any order to rider by seller
    RIDER_SHIPMENT_REJECTED: 26, // when rider assigned any order to rider by seller

    ORDER_DRAFT: 49, // This is the order in the cart
    ORDER_PLACED: 50,
    // ORDER_PLACED: 50, // customer started the checkout process but did not complete it. Incomplete orders are assigned a "Pending" status
    ORDER_AWAIT_PAYMENT: 51, //  customer has completed the checkout process, but payment has yet to be confirmed.
    ORDER_AWAIT_FULFILMENT: 52, // order has been pulled and packaged and is awaiting collection from a shipping provider
    ORDER_SHIPPING: 53, //  order has been packaged and is awaiting customer pickup from a seller-specified location
    ORDER_CANCELLED: 54, // buyer has cancelled an order
    ORDER_DECLINED: 55, // seller has marked the order as declined for lack of manual payment, or other reasons
    ORDER_REFUNDED: 56, // refunded
    ORDER_FULFILLED: 57, // completed
    ORDER_DISPUTE: 58, // Dispute

    ISSUE_RAISED: 80,
    ISSUE_IN_PROGRESS: 81,
    ISSUE_SOLVED: 82
};

module.exports = STATUS;
