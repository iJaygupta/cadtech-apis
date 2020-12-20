module.exports = {

    addCourseCategory: {
        "properties": {
            "name": { "type": ["string"] },
            "meta_title": { "type": ["string"] },
            "meta_description": { "type": ["string"] },
            "description": { "type": ["string"] },
            "slug": { "type": ["string"] },
            "filename": { "type": ["string"] },
        },
        "additionalProperties": false,
    },
    updateCourseCategory: {
        "properties": {
            "name": { "type": ["string"] },
            "meta_title": { "type": ["string"] },
            "meta_description": { "type": ["string"] },
            "description": { "type": ["string"] },
            "slug": { "type": ["string"] },
            "filename": { "type": ["string"] },
        },
        "additionalProperties": false,
    },
    addCourse: {
        "properties": {
            "name": { "type": ["string"] },
            "description": { "type": ["string"] },
            "price": { "type": ["string"] },
            "duration": { "type": ["string"] },
            "slug": { "type": ["string"] },
            "total_classes": { "type": ["string"] },
            "filename": { "type": ["string"] },
            "course_category_id": { "type": ["array"] }
        },
        "additionalProperties": false,
    },
    updateCourse: {
        "properties": {
            "name": { "type": ["string"] },
            "meta_title": { "type": ["string"] },
            "meta_description": { "type": ["string"] },
            "description": { "type": ["string"] },
            "slug": { "type": ["string"] },
            "filename": { "type": ["string"] },
            "total_classes": { "type": ["string"] },
            "course_category_id": { "type": ["array"] }
        },
        "additionalProperties": false,
    },

}