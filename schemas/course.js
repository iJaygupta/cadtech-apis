module.exports = {
    addCourse: {
        "properties": {
            "name": { "type": ["string"] },
            "meta_title": { "type": ["string"] },
            "meta_description": { "type": ["string"] },
            "description": { "type": ["string"] },
            "slug": { "type": ["string"] },
            "filename": { "type": ["string"] },
            "total_classes": { "type": ["string"] },
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
        },
        "additionalProperties": false,
    },
  
   
    
}