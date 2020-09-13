const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const msg = require('../lib/messages');
const config = require('../config/server');
const ROLES = require('./Roles');
const ADDRESS = require('./Address');
let User;
const STATUS = require('./Status');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true
        },

        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            validate: value => {
                if (!validator.isEmail(value)) {
                    throw new Error({ error: 'Invalid Email address' });
                }
            }
        },

        mobile: {
            type: String,
            // required: true,
            // unique: true,
            trim: true
        },
        password: {
            type: String,
            // required: true,
            minLength: 7
        },

        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        email_verified: {
            type: Boolean,
            required: false
        },
        mobile_verified: {
            type: Boolean,
            required: false
        },

        gender: {
            type: String,
            enum: ['male', 'female', '']
        },
        profile: {
            filename: String,
            alt: String
        },
        education: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        zone: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true }
        ],
        documents: [
            {
                name: String,
                file_path: String
            }
        ],
        highest_qualification: { type: String },
        experiences: [
            { organisation: String, role: String, from_year: Number, to_year: Number }
        ],
        roles: [{ type: String, default: ROLES.USER }],
        status: { type: Number, default: STATUS.INACTIVE },
        work_status: {
            type: String,
            enum: [
                STATUS.RIDER_AVAILABLE,
                STATUS.RIDER_DROPPING,
                STATUS.RIDER_OFF,
                STATUS.NA
            ],
            default: STATUS.NA
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.hasRole = function (data) {
    const user = this;
    let role;
    if (data === ROLES.ADMIN) {
        role = user.roles.some(el => el === ROLES.ADMIN || el === ROLES.SELLER);
    }
    return role;
};

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, config.jwtSecretKey, {
        expiresIn: '10d'
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

let transformFields = [
    '_id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'roles',
    'zone',
    'documents',
    'experiences',
    'profile',
    'address',
    'status',
    'work_status',
    'gender',
    'education',
    'createdAt'

];

userSchema.methods.transform = function () {
    const transformed = {};
    const fields = transformFields;
    fields.forEach(field => {
        transformed[field] = this[field];
    });
    return transformed;
};

userSchema.methods.isAllowed = function () {
    return this.status === STATUS.ACTIVE;
};

userSchema.methods.sellerNotApproved = function () {
    return this.status === STATUS.ACCOUNT_SELLER_NOT_APPROVED;
};

userSchema.statics = {
    getTransformFields() {
        return transformFields;
    },
    async findByCredentials(userName, password) {
        const user = await User.findOne({ $or: [{ email: userName }, { mobile: userName }] });
        if (!user) {
            return false;
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return false;
        }
        return user;
    },

    async isEmailTaken(email) {
        let user = await User.findOne({ email }).exec();
        if (user) {
            return true;
        }
        return false;
    },
    async isMobileTaken(mobile) {
        let user = await User.findOne({ mobile }).exec();
        if (user) {
            return true;
        }
        return false;
    },

    async isValidPassword(user, password) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error(msg.msg('invalid_creds'));
        }
        return user;
    },
};

User = mongoose.model('user', userSchema);

module.exports = User;
