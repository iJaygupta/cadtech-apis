const mongoose = require("mongoose");

const courseCategorySchema = new mongoose.Schema({
    name: String,
    meta_title: String,
    meta_description: String,
    description: String,
    slug: String,
    filename: String,
},
    {
        timestamps: true
    });

const CourseCategory = mongoose.model('coursecategory', courseCategorySchema);

export default CourseCategory;