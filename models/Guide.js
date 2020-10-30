const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    name : String,
    meta_title: String,
    meta_description: String,
    description: String,
    slug: String,
    filename: String
},
{
    timestemp:true
});

const guide = mongoose.model('guide', guideSchema);

export default guide;