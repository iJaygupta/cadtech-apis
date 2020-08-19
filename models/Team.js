const mongoose = require("mongoose");

var teamSchema = new mongoose.Schema({
    name: { type: String },
    designation: { type: String },
    phone_number: { type: String },
    image: { type: String },
    bio: { type: String },
    order: { type: Number },
    is_active: { type: Boolean, default: false }
},
    {
        timestamps: true
    }
);


const Team = mongoose.model('team', teamSchema);

export default Team;
