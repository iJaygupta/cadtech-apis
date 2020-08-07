const mongoose = require("mongoose");

var ContactusSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    phone_number: { type: String },
    query: { type: String }
},
    {
        timestamps: true
    }
);


const ContactUs = mongoose.model('contactUs', ContactusSchema);

export default ContactUs;