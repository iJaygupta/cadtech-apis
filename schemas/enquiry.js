module.exports = {
  addEnquiry: {
    "properties": {
      "email": { "type": ["string"] },
      "message": { "type": ["string"] },
      "course": { "type": ["string"] },
      "slug": { "type": ["string"] },
      "mobile": { "type": ["string"] },
    },
    "required": ["course", "mobile"],
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
      "Registration Id": { "type": ["number"], "errorMessage":{ "type": 'Registration Id should be an number'} },
      "Full Name": { "type": ["string"], "errorMessage":{ "type": 'Full Name should be an string'} },
      "Course": { "type": ["string"], "errorMessage":{ "type": 'Course should be an string'} },
      "Grade": { "type": ["string"], "errorMessage":{ "type": 'Grade should be an string'} },
      "Date": { "type": ["string"], "errorMessage":{ "type": 'Date should be an string'} },
      "Date Of Birth":{ "type": ["string"], "errorMessage":{ "type": 'Date Of Birth should be an string'} },
    },
    "required": ["Registration Id", "Full Name", "Course", "Grade", "Date", "Date Of Birth"],
  }


}

function dateValidate (name) {
  return {
    type: ["string"],
    pattern: "",
    errorMessage: {
      type: `${name} should be an string`,
      pattern: `Correct format of ${name} is yyyy/mm/dd`
    }
  }
}