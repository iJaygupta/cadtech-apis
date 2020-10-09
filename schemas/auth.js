module.exports = {

    register: {
        "properties": {
            "firstName": { "type": ["string"] },
            "lastName": { "type": ["string"] },
            "email": { "type": ["string"] },
            "mobile": { "type": ["string"] },
            "password": { "type": ["string"] },
            "education": { "type": ["string"] },
            "gender": { "type": ["string"] },
            "address": { "type": ["string"] },
        },
        "required": ["firstName", "lastName", "mobile", "password"],
        "additionalProperties": false,
    },
    login: {
        "properties": {
            "userName": { "type": ["string"] },
            "password": { "type": ["string"] },
        },
        "required": ["userName", "password"],
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
