import Course from '../../models/Course';
import CourseCategory from '../../models/CourseCategory';
import APIError from '../../lib/APIError';
const HttpStatus = require('http-status-codes');
const mongoose = require("mongoose");
const resPerPage = process.env.RESPONSE_PER_PAGE || 12;


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
            let page = parseInt(query.page) || 1;
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
                filters["name"] = { "$regex": new RegExp(searchKeyword), '$options': 'i' }
            }
            if (query.slug) {
                filters["slug"] = query.slug;
            }

            let [countData, data] = await Promise.all([Course.countDocuments(),
            Course.find(filters)
                .limit(limit)
                .skip(skip)
                .sort(sort)
            ]);

            if (data && data.length) {
                let result = {
                    "items": data,
                    "totalRecords": countData,
                    "totalResult": data.length,
                    "pagination": !(query.pagination && query.page) ? false : "",
                }
                if (query.pagination && query.page) {
                    result["pagination"] = {
                        "totalRecords": countData,
                        "totalPages": Math.ceil(countData / resPerPage),
                        "currentPage": page,
                        "resPerPage": resPerPage,
                        "hasPrevPage": page > 1,
                        "hasNextPage": page < Math.ceil(countData / resPerPage),
                        "previousPage": page > 1 ? page - 1 : null,
                        "nextPage": page < Math.ceil(countData / resPerPage) ? page + 1 : null
                    }
                } else {
                    if (query.limit) {
                        result["limit"] = limit
                    }
                    if (query.skip) {
                        result["skip"] = skip
                    }
                }
                return result
            } else {
                return {}
            }
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
