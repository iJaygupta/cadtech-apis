import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import winston from 'winston';
import logger from './lib/logger';
import settings from './config/server';
import security from './lib/security';
import apiRouter from './apiRouter';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const cors = require('cors');
const app = express();
const mongo = require('./lib/mongo');
const STATIC_OPTIONS = {
	maxAge: 31536000000 // One year
};

app.use(cors());
app.set('trust proxy', 1);

app.use(helmet());
app.use(express.static('public/content', STATIC_OPTIONS));

app.all('*', (req, res, next) => {
	// CORS headers
	const allowedOrigins = security.getAccessControlAllowOrigin();
	const { origin } = req.headers;
	if (allowedOrigins === '*') {
		res.setHeader('Access-Control-Allow-Origin', allowedOrigins);
	} else if (allowedOrigins.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization'
	);
	next();
});

app.get('/', (req, res) => {
	res.status(200).send({
		"error": false,
		"code": 200,
		"msg": "Welcome to CadTech Apis !!",
	});
});

app.use(responseTime());
app.use(cookieParser(settings.cookieSecretKey));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use(logger.sendResponse);

app.all("*", function (req, res) {
	res.status(404).send({
		error: true,
		"code": 404,
		msg: "API Not Found"
	});
});

const server = app.listen(settings.apiListenPort, () => {
	const serverAddress = server.address();
	winston.info(`API running at http://localhost:${serverAddress.port}`);
});
mongo.default.connectWithRetry()
