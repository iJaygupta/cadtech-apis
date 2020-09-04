module.exports = {

    register: {
        "properties": {
            "first_Name": { "type": ["string"] },
            "last_Name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "mobile_number": { "type": ["string"] },
            "password": { "type": ["string"] },
            "education": { "type": ["string"] },
            "gender": { "enum": ["female", "male"] },
            "address": { "type": ["object"] },
            "highest_qualification": { "type": ["string"] },
            "work_status": { "type": ["object"] },
        },
        "required": ["first_Name", "last_Name", "email", "mobile_number", "password"],
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
