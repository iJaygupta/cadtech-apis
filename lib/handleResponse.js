const responseFile = require("../lib/response");



exports.sendSuccess = function (response, statusCode, responseCode, data) {
    let output = {
        status: "OK",
        message: responseFile[responseCode]["msg"],
        code: responseFile[responseCode]["code"],
    };
    if (data) {
        output.data = data;
    }
    response.status(statusCode).send(output);
};

exports.sendError = function (res, error) {
    res.status(error.status || 500)
        .send({
            status: "Failed",
            message: error.message,
            error: true,
            errors: error.errors
        });
}