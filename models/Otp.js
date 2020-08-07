var mongoose = require('mongoose');

var userOtp = new mongoose.Schema({
    user_id: { type: String },
    mobile_otp: { type: Number },
    mobile_otp_datetime: { type: Date },
    mobile: { type: Number },
    email: { type: String },
    email_otp: { type: String },
    email_otp_datetime: { type: Date }
});

const Otp = mongoose.model('Otp', userOtp);


export default Otp;