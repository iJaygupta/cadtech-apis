const AddressType = require('./AddressType');

let Address = {
    address1: String,
    address2: String,
    city: String,
    country: String,
    state: String,
    phone: String,
    locality: String,
    postal_code: String,
    full_name: String,
    company: String,
    tax_number: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    geolocation_address: String,

    details: String,
    land_mark: String,
    address_type: {
        type: String,
        enum: [AddressType.HOME, AddressType.WORK],
        default: AddressType.HOME
    },
    default_address: {
        type: Boolean,
        default: false
    },
    house_number: { type: String }
};

module.exports = Address;
