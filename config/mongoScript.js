const LookUpData = require('./lookUp.json');
const courseData = require('./course.json');


export function insertLookUpData(db) {
  db.collection('commons').deleteMany();
  db.collection('courses').deleteMany();
  db.collection('commons').insertMany([LookUpData]);
  db.collection('courses').insertMany(courseData);

}