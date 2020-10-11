const LookUpData = require('./lookUp.json');
const courseData = require('./course.json');
const courseCategoriesData = require('./courseCategories.json');
const courseMapping = require('./course-mapping.json');
const mongoose = require("mongoose");



export function insertLookUpData(db) {
  db.collection('commons').deleteMany();
  db.collection('courses').deleteMany();
  db.collection('coursecategories').deleteMany();
  db.collection('commons').insertMany([LookUpData]);
  db.collection('coursecategories').insertMany(courseCategoriesData);
  db.collection('courses').insertMany(courseData);

}


export async function mapCourseWithCourseCategory(db) {
  let courses = await db.collection('courses').find({}).toArray();
  let courseCategories = await db.collection('coursecategories').find({}).toArray();

  let processes = courses.map(async course => {
    if (courseMapping[course.name] && courseMapping[course.name].length) {
      let course_category_id = [];
      courseCategories.map(el => {
        if (courseMapping[course.name].includes(el.meta_title)) {
          course_category_id.push(mongoose.Types.ObjectId(el._id))
        }
      })
      await db.collection('courses').updateOne({ _id: course._id }, { $set: { course_category_id: course_category_id } });
    }
  })
  await Promise.all(processes);
}
