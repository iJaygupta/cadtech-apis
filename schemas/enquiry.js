module.exports = {
    addEnquiry: {
        "properties": {
            "email": { "type": ["string"] },
            "query": { "type": ["string"] },
        },
        "additionalProperties": false,
    },
  
    contactUs: {
      "properties": {
        "email": { "type": ["string"] },
        "name": { "type": ["string"] },
        "phone_number": { "type": ["string"] },
        "query": { "type": ["string"] },
       
      },
      "additionalProperties": false,
    },
    addTeamMember: {
        "properties": {
          "designation": { "type": ["string"] },
          "name": { "type": ["string"] },
          "phone_number": { "type": ["string"] },
          "bio": { "type": ["string"] },
          "order": { "type": ["number"] },
          "image": { "type": ["string"] },
          "is_active": { "type": ["boolean"] },

        },
        "additionalProperties": false,
      },
    
}