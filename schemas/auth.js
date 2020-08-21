module.exports = {

    register: {
        "properties": {
            "name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "password": { "type": ["string"] },
        },
        "required": ["name", "email", "password"],
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
