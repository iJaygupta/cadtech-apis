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
      "oldPassword": { "type": ["string"] },
      "newPassword": { "type": ["string"] },
      "confirmPassword": { "type": ["string"] }
    },
    "required": ["oldPassword", "newPassword", "confirmPassword"],
    "additionalProperties": false,
  },
  updateUserStatus: {
    "properties": {
      "status": { "type": ["number"] },
      "userId": { "type": ["string"] },
    },
    "required": ["userId", "status"],
    "additionalProperties": false,
  },

}
