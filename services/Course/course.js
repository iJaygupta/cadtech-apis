import Course from '../../models/Course';
import CourseCategory from '../../models/CourseCategory';
import APIError from '../../lib/APIError';
const HttpStatus = require('http-status-codes');
const mongoose = require("mongoose");
const resPerPage = process.env.RESPONSE_PER_PAGE || 18;

class CourseService {

    async addCourse(data) {
        try {
            let result = await Course.find({ name: data.name });
            if (result.length) {
                throw new APIError({ message: 'Course name already exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            result = new Course({
                ...data
            });
            result = await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getCourses(query) {
        try {
            let filters = {};
            let limit, skip, searchKeyword;
            let sort = {};

            if (query.sortBy && query.orderBy) {
                sort[query.sortBy] = query.orderBy === 'desc' ? -1 : 1
            }
            if (!(query.pagination && query.page)) {
                limit = parseInt(query.limit) || resPerPage;
                skip = parseInt(query.skip) || 0;
                searchKeyword = query.searchKeyword || "";
            } else {
                limit = resPerPage;
                skip = (page - 1) * resPerPage
            }
            if (searchKeyword) {
                filters["name"] = { "$regex": new RegExp(searchKeyword) }
            }
            if (query.course_category_id) {
                filters.course_category_id = mongoose.Types.ObjectId(query.course_category_id)
            }

            let course = await Course.find(filters)
                .limit(limit)
                .skip(skip)
                .sort(sort);
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

    async addCourseCategory(data) {
        try {
            let result = await CourseCategory.find({ name: data.name });
            if (result.length) {
                throw new APIError({ message: 'Course Category name already exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            result = new CourseCategory({
                ...data
            });
            result = await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getCourseCategories(query) {
        try {
            let filters = {};
            let limit, skip, searchKeyword;
            let sort = {};

            if (query.sortBy && query.orderBy) {
                sort[query.sortBy] = query.orderBy === 'desc' ? -1 : 1
            }
            if (!(query.pagination && query.page)) {
                limit = parseInt(query.limit) || resPerPage;
                skip = parseInt(query.skip) || 0;
                searchKeyword = query.searchKeyword || "";
            } else {
                limit = resPerPage;
                skip = (page - 1) * resPerPage
            }
            if (searchKeyword) {
                filters["name"] = { "$regex": new RegExp(searchKeyword) }
            }

            let result = await CourseCategory.find(filters)
                .limit(limit)
                .skip(skip)
                .sort(sort);

            if (query.subcourse) {
                result = await CourseCategory.aggregate([
                    {
                        $match: filters
                    },
                    {
                        "$lookup": {
                            "from": "courses",
                            "localField": "_id",
                            "foreignField": "course_category_id",
                            "as": "subcourses"
                        }
                    }
                ])
                    .limit(limit)
                    .skip(skip)
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getSingleCourseCategory(course_category_id) {
        try {
            let result = await CourseCategory.aggregate([
                {
                    "$match": {
                        "_id": mongoose.Types.ObjectId(course_category_id)
                    }
                },
                {
                    "$lookup": {
                        "from": "courses",
                        "localField": "_id",
                        "foreignField": "course_category_id",
                        "as": "courses"
                    }
                },
            ])
            if (!result) {
                throw new APIError({ message: 'Course Category does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateCourseCategory(course_category_id, data) {
        try {
            let result = await CourseCategory.findByIdAndUpdate(
                course_category_id,
                {
                    $set: data
                },
                {
                    new: true
                }
            );
            if (!result) {
                throw new APIError({ message: 'Course Category does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteCourseCategory(course_category_id) {
        try {
            let result = await CourseCategory.findByIdAndDelete(course_category_id);
            if (!result) {
                throw new APIError({ message: 'Course Category does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }


}

export default new CourseService();
