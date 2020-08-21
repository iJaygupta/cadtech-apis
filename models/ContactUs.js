const mongoose = require("mongoose");

var ContactusSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    subject: { type: String },
    message: { type: String }
},
    {
        timestamps: true
    }
);


const ContactUs = mongoose.model('contactUs', ContactusSchema);

export default ContactUs;