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
            validator.validateAjv(schema.addCourse),
            security.auth.bind(this),
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
            validator.validateAjv(schema.updateCourse),
            security.auth.bind(this),
            this.updateCourse.bind(this)
        );
        this.router.delete(
            '/v1/course/:courseId',
            security.auth.bind(this),
            this.deleteCourse.bind(this)
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
}

export default CourseRoute;
