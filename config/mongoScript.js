const LookUpData = require('./lookUp.json');
const courseData = require('./course.json');
const courseCategoriesData = require('./courseCategories.json');


export function insertLookUpData(db) {
  db.collection('commons').deleteMany();
  db.collection('courses').deleteMany();
  db.collection('coursecategories').deleteMany();
  db.collection('commons').insertMany([LookUpData]);
  db.collection('coursecategories').insertMany(courseCategoriesData);
  db.collection('courses').insertMany(courseData);

}