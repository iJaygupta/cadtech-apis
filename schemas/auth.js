module.exports = {

    register: {
        "properties": {
            "first_name": { "type": ["string"] },
            "last_name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "source": { "type": ["string"] },
            "mobile_number": { "type": ["string"], "maxLength": 12 },
            "password": { "type": ["string"] },

        },
        "required": ["mobile_number","email","first_name","last_name"],
        "additionalProperties": false,
    },
    login: {
        "properties": {
            "email": { "type": ["string"] },
            "password": { "type": ["string"] },
        },
        "required": ["email", "password"],
        "additionalProperties": false,
    },
    verifyEmailCode: {
        "properties": {
            "email": { "type": ["string"] },
            "code": { "type": ["string"] }
        },
        "required": ["email", "code"],
        "additionalProperties": false,
    },
    verifyMobileCode: {
        "properties": {
            "mobile": { "type": ["string"] },
            "code": { "type": ["string"] }
        },
        "required": ["mobile", "code"],
        "additionalProperties": false,
    },
    
}


