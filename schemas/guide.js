module.exports ={

    addGuide :{
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
    updateGuide :{
        "properties": {
            "name": { "type": ["string"] },
            "meta_title": { "type": ["string"] },
            "meta_description": { "type": ["string"] },
            "description": { "type": ["string"] },
            "slug": { "type": ["string"] },
            "filename": { "type": ["string"] },
        },
        "additionalProperties": false,


    }

}