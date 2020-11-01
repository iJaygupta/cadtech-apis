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
      "message": { "type": ["string"] },
      "name": { "type": ["string"] },
      "subject": { "type": ["string"] },
      "slug": { "type": ["string"] },
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
      "social_link": { "type": ["object"] },
    },
    "additionalProperties": false,
  },

  bulkUpload: {
    "properties": {
      "Registration Id": { "type": ["number"] },
      "Full Name": { "type": ["string"] },
      "Course": { "type": ["string"] },
      "Grade": { "type": ["string"] },
      "Date": { "type": ["string"] },
      "Date Of Birth": { "type": ["string"] },
    },
    "required": ["Registration Id", "Full Name", "Course", "Grade", "Date", "Date Of Birth"],
  }

}