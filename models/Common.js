var mongoose = require("mongoose");

var commonSchema = mongoose.Schema({
  title: { type: String },
  updatedDate: {
    type: Date, default: new Date()
  },
  contact_details:
  {
    name: String,
    address: String,
    phone_number: String
  },
  common_questions: [
    {
      question_id: String,
      question: String
    }
  ],
},
  {
    timestamps: true,
  }
);

const Common = mongoose.model('common', commonSchema);

export default Common;