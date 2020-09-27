const mongoose = require("mongoose");

var studentCertificatesSchema = new mongoose.Schema({
    rollno: { type: Number },
    user_id: { type: String },
    grade: { type: String },
    completedDate: { type: Date },
},
    {
        timestamps: true
    }
);


const StudentCertificates = mongoose.model('studentCertificates', studentCertificatesSchema);

export default StudentCertificates;
