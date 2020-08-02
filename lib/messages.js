const messages = {
    invalid_creds: 'Invalid Credentials',
    not_register: `Hey, looks like you haven't not register. please register`,
    no_product: 'Product does not exist',
    product_delete: 'Product successfully deleted !',
    product_update: 'Product successfully updated !',
    option_delete: 'Variant options successfully deleted !',
    something_went_wrong: 'something went wrong, please try again later !',
    no_items_in_wishlist: `Sorry, you haven't added any item in the wishlist.`,
    no_order: 'Order does not exist',
    no_dispute: 'There is No Dispute Order Found with the given ID',
    no_category: 'Category not found',
    user_not_exist: `User doesn't Exist`,
    order_shipped: 'Order Shipped',
    order_cancelled: 'Order cancelled',
    shipping_awaiting: 'Order awating for shipping',
    payment_awaiting: 'Order awating for payment',
    Order_delivered: 'Order delivered',
    dispute_order: 'Order Dispute',
    order_placed: 'Order placed',
    updated_done: 'updated successfully',
    order_payment: 'Payment confirmed',
    application_already_approved: 'Application already approved',
    TRANSACTION_FAILED: 'Transaction Failed',
    old_password_incorrect: 'Old password incorrect',
    mobile_number_exists: 'Mobile number already taken'
};

const msg = (key, placeholders = {}) => {
    let messageString = messages[key] || key.replace('_', ' ');
    return messageString;
};

module.exports = {
    msg
};
