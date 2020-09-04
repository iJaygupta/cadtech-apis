import jwt from 'jsonwebtoken';
import settings from '../config/server';
import User from '../models/User';
import ROLES from '../models/Roles';

const DEVELOPER_MODE = settings.developerMode === true;

const scope = {
    ADMIN: 'admin',
    PARTNER: 'partner',
    DASHBOARD: 'dashboard',
    READ_PRODUCTS: 'read:products',
    WRITE_PRODUCTS: 'write:products',
    READ_PRODUCT_CATEGORIES: 'read:product_categories',
    WRITE_PRODUCT_CATEGORIES: 'write:product_categories',
    READ_ORDERS: 'read:orders',
    WRITE_ORDERS: 'write:orders',
    READ_CUSTOMERS: 'read:customers',
    WRITE_CUSTOMERS: 'write:customers',
};

const getAccessControlAllowOrigin = () =>
    [settings.storeBaseUrl, settings.adminBaseURL] || '*';

const checkUserScope = (requiredScope, req, res, next) => {
    if (DEVELOPER_MODE === true) {
        next();
    } else if (
        req.user &&
        req.user.scopes &&
        req.user.scopes.length > 0 &&
        (req.user.scopes.includes(scope.ADMIN) ||
            req.user.scopes.includes(requiredScope))
    ) {
        next();
    } else {
        res.status(403).send({ error: true, message: 'Forbidden' });
    }
};

const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, settings.jwtSecretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                // check on blacklist
                resolve(decoded);
            }
        });
    });

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    verifyToken(token)
        .then(user => {
            User.findOne({ _id: user._id }).then(
                user => {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res
                            .status(404)
                            .send({ error: true, message: 'user does not found' });
                    }
                },
                _error => {
                    res.status(401).send({ error: true, message: 'Unauthorized' });
                }
            );
        })
        .catch(error => {
            res.status(401).send({ error: true, message: 'Unauthorized' });
        });
};

const isAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    verifyToken(token)
        .then(async user => {
            let userObj = await User.findOne({ _id: user._id }).select('roles');
            userObj = userObj.roles.find(el => el === ROLES.ADMIN);
            if (userObj) {
                req.user = user;
                next();
            } else {
                res.status(403).send({ error: true, message: 'Unauthorized as Admin' });
            }
        })
        .catch(error => {
            res.status(401).send({ error: true, message: 'Unauthorized' });
        });
};

export default {
    getAccessControlAllowOrigin,
    checkUserScope,
    scope,
    verifyToken,
    auth,
    isAdmin,
};
