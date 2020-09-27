const mongoose = require("mongoose");

var studentCertificatesSchema = new mongoose.Schema({
    registration_id: { type: Number },
    fullName: { type: String },
    courseName: { type: String },
    grade: { type: String },
    date: { type: Date },
},
    {
        timestamps: true
    }
);


const StudentCertificates = mongoose.model('studentcertificates', studentCertificatesSchema);

export default StudentCertificates;