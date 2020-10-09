const mongoose = require("mongoose");

var studentCertificatesSchema = new mongoose.Schema({
    registration_id: { type: Number, required: true, unique: true },
    fullName: { type: String },
    course: { type: String },
    grade: { type: String },
    date: { type: Date },
    isActive: { type: Boolean },
},
    {
        timestamps: true
    }
);


const StudentCertificates = mongoose.model('studentcertificates', studentCertificatesSchema);

export default StudentCertificates;
