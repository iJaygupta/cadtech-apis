module.exports = {
    updateUserAccountDetails: {
        "properties": {
            "first_name": { "type": ["string"] },
            "last_name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "source": { "type": ["string"] },
            "mobile_number": { "type": ["string"], "maxLength": 12 },
        },
        "additionalProperties": false,
    },
  
    updateUserPassword: {
      "properties": {
        "oldPassword": { "type": ["string"], "minLength": 8 },
        "password": { "type": ["string"], "minLength": 8 },
      },
      "required": ["password", "oldPassword"],
      "additionalProperties": false,
    },
  
}