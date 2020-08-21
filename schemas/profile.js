module.exports = {
  updateUserAccountDetails: {
    "properties": {
      "name": { "type": ["string"] },
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