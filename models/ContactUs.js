const mongoose = require("mongoose");

var ContactusSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    subject: { type: String },
    message: { type: String },
    slug: { type: String, default: "contact_us" },
    course: { type: String },
    mobile: { type: String },

},
    {
        timestamps: true
    }
);


const ContactUs = mongoose.model('contactus', ContactusSchema);

export default ContactUs;