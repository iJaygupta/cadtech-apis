const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: String,
    meta_title: String,
    meta_description: String,
    description: String,
    slug: String,
    filename: String,
    total_classes: Number

},
    {
        timestamps: true
    });

const Course = mongoose.model('couurse', courseSchema);

export default Course;