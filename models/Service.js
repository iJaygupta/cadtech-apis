const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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

const service = mongoose.model('service', serviceSchema);

export default service;