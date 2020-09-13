
const Ajv = require("ajv");
const ajv = new Ajv();
const utils = require('../common/utils');


exports.validateAjv = (schema) => {
    return function (req, res, next) {
        var validate = ajv.compile(schema);
        if (validate(req.body)) {
            next();
        } else {
            utils.ajvErrors(validate.errors, function (errMsg) {
                var output = {
                    error: true,
                    msg: errMsg,
                    code: 9001,
                    data: null
                }
                res.status(422).json(output);
            })
        }
    }
}

