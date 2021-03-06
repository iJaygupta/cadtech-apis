const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: String,
    meta_title: String,
    meta_description: String,
    description: String,
    slug: String,
    filename: String,
    total_classes: Number,
    price: Number,
    course_category_id:
        [{ type: mongoose.Schema.Types.ObjectId, ref: 'coursecategory' }]
},
    {
        timestamps: true
    });

const Course = mongoose.model('course', courseSchema);

export default Course;