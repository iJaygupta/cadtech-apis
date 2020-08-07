import Course from '../../models/Course';
import APIError from '../../lib/APIError';
const HttpStatus = require('http-status-codes');


class CourseService {

    async addCourse(data) {
        try {
            let course = new Course({
                ...data
            });
            course = await course.save();
            return course
        } catch (error) {
            throw error;
        }
    }

    async getCourses() {
        try {
            let course = await Course.find({});
            return course;
        } catch (error) {
            throw error;
        }
    }

    async getSingleCourse(courseId) {
        try {
            let result = await Course.findById(courseId);
            if (!result) {
                throw new APIError({ message: 'Course does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateCourse(courseId, data) {
        try {
            let result = await Course.findByIdAndUpdate(
                courseId,
                {
                    $set: data
                },
                {
                    new: true
                }
            );
            if (!result) {
                throw new APIError({ message: 'Course does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteCourse(courseId) {
        try {
            let result = await Course.findByIdAndDelete(courseId);
            if (!result) {
                throw new APIError({ message: 'Course does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default new CourseService();
