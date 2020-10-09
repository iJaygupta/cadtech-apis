import security from '../lib/security';
import CourseService from '../services/Course/course';
const { sendSuccess, sendError } = require('../lib/handleResponse');
const HttpStatus = require('http-status-codes');
const validator = require('../lib/validator');
const schema = require("../schemas/course");

class CourseRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/v1/course',
            security.auth.bind(this),
            validator.validateAjv(schema.addCourse),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.addCourse.bind(this)
        );
        this.router.get(
            '/v1/course',
            this.getCourses.bind(this)
        );
        this.router.get(
            '/v1/course/:courseId',
            this.getSingleCourse.bind(this)
        );
        this.router.put(
            '/v1/course/:courseId',
            security.auth.bind(this),
            validator.validateAjv(schema.updateCourse),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.updateCourse.bind(this)
        );
        this.router.delete(
            '/v1/course/:courseId',
            security.auth.bind(this),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.deleteCourse.bind(this)
        );
        this.router.post(
            '/v1/category/course',
            security.auth.bind(this),
            validator.validateAjv(schema.addCourseCategory),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.addCourseCategory.bind(this)
        );
        this.router.get(
            '/v1/category/course',
            this.getCourseCategories.bind(this)
        );
        this.router.get(
            '/v1/category/course/:course_category_id',
            this.getSingleCourseCategory.bind(this)
        );
        this.router.put(
            '/v1/category/course/:course_category_id',
            security.auth.bind(this),
            validator.validateAjv(schema.updateCourseCategory),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.updateCourseCategory.bind(this)
        );
        this.router.delete(
            '/v1/category/course/:course_category_id',
            security.auth.bind(this),
            security.checkUserScope.bind(this, security.scope.ADMIN),
            this.deleteCourseCategory.bind(this)
        );

    }

    async addCourse(req, res, next) {
        try {
            const $response = await CourseService.addCourse(req.body);
            sendSuccess(res, HttpStatus.OK, 2016, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getCourses(req, res, next) {
        try {
            const $response = await CourseService.getCourses(req.query);
            sendSuccess(res, HttpStatus.OK, 2017, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getSingleCourse(req, res, next) {
        try {
            const $response = await CourseService.getSingleCourse(req.params.courseId);
            sendSuccess(res, HttpStatus.OK, 2018, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateCourse(req, res, next) {
        try {
            const $response = await CourseService.updateCourse(req.params.courseId, req.body);
            sendSuccess(res, HttpStatus.OK, 2019, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async deleteCourse(req, res, next) {
        try {
            const $response = await CourseService.deleteCourse(req.params.courseId);
            sendSuccess(res, HttpStatus.OK, 2020, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async addCourseCategory(req, res, next) {
        try {
            const $response = await CourseService.addCourseCategory(req.body);
            sendSuccess(res, HttpStatus.OK, 2029, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getCourseCategories(req, res, next) {
        try {
            const $response = await CourseService.getCourseCategories(req.query);
            sendSuccess(res, HttpStatus.OK, 2030, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getSingleCourseCategory(req, res, next) {
        try {
            const $response = await CourseService.getSingleCourseCategory(req.params.course_category_id);
            sendSuccess(res, HttpStatus.OK, 2031, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateCourseCategory(req, res, next) {
        try {
            const $response = await CourseService.updateCourseCategory(req.params.course_category_id, req.body);
            sendSuccess(res, HttpStatus.OK, 2032, $response);
        } catch (error) {
            sendError(res, error);
        }
    }

    async deleteCourseCategory(req, res, next) {
        try {
            const $response = await CourseService.deleteCourseCategory(req.params.course_category_id);
            sendSuccess(res, HttpStatus.OK, 2033, $response);
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default CourseRoute;
