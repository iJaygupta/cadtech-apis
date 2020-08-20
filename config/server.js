const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// config used by server side only
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'cadtech';
const dbUser = process.env.DB_USER || '';
const dbPass = process.env.DB_PASS || '';
const dbCred =
	dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : '';

const dbUrl =
	process.env.DB_URL || `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;

module.exports = {
	// used by Store (server side)
	apiBaseUrl: process.env.API_BASE_URL || ``,

	// Access-Control-Allow-Origin
	storeBaseUrl: process.env.STORE_BASE_URL || ``,

	// Access-Control-Allow-Origin
	paymentUrl: "",

	VERIFY_KEY: '',
	SECRET_KEY: '',
	MERCHANT_ID: '',

	// used by API
	adminBaseURL: process.env.ADMIN_BASE_URL || 'https://cadtech.in',
	adminLoginPath: process.env.ADMIN_LOGIN_PATH || '/login',

	apiListenPort: process.env.API_PORT || 3005,

	// used by API
	mongodbServerUrl: dbUrl,
	smsSettings: {},
	otpSettings: {
		life_time_minutes: 2
	},

	// assest
	assetServer: {
		type: process.env.ASSETS_TYPE || 's3', // 'local' | 's3'
		domain: process.env.ASSETS_BASE_URL || '', // add localBasePath to S3 domain
		domain:
			process.env.ASSETS_BASE_URL,
		// S3 Config
		bucket: 'cadtech-content',
		accessKeyId: '',
		secretAccessKey: '',
		region: ''
	},

	// key to sign tokens
	jwtSecretKey: process.env.JWT_SECRET_KEY || 'YWRtaW46cjNAY3RpMG4=',

	// key to sign store cookies
	cookieSecretKey: process.env.COOKIE_SECRET_KEY || '-',

	// store UI language
	language: process.env.LANGUAGE || '',

	// used by API
	orderStartNumber: 1000,

	// cost factor, controls how much time is needed to calculate a single BCrypt hash
	// for production: recommended salRounds > 12
	saltRounds: process.env.SALT_ROUNDS || 12,

	developerMode: process.env.DEVELOPER_MODE || true
};
