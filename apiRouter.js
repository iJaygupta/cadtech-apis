import express from 'express';
import AuthRoute from './routes/auth';
import ProfileRoute from './routes/profile';
import CourseRoute from './routes/course';



const apiRouter = express.Router();

new AuthRoute(apiRouter);
new ProfileRoute(apiRouter);
new CourseRoute(apiRouter);


export default apiRouter;
