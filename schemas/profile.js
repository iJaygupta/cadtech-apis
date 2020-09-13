module.exports = {
  updateUserAccountDetails: {
    "properties": {
      "firstName": { "type": ["string"] },
      "lastName": { "type": ["string"] },
      "email": { "type": ["string"] },
      "source": { "type": ["string"] },
      "mobile": { "type": ["string"], "maxLength": 12 },
      "education": { "type": ["string"] },
      "gender": { "type": ["string"] },
      "address": { "type": ["string"] },

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
