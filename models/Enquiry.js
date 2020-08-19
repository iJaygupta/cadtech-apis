const mongoose = require("mongoose");

var EnquirySchema = new mongoose.Schema({
    email: { type: String },
    query: { type: String }
},
    {
        timestamps: true
    }
);


const Enquiry = mongoose.model('enquiry', EnquirySchema);

export default Enquiry;
