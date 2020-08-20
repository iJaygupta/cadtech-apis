import express from 'express';
import AuthRoute from './routes/auth';
import ProfileRoute from './routes/profile';
import CourseRoute from './routes/course';
import EnquiryRoute from './routes/enquiry';




const apiRouter = express.Router();

new AuthRoute(apiRouter);
new ProfileRoute(apiRouter);
new CourseRoute(apiRouter);
new EnquiryRoute(apiRouter);



export default apiRouter;
