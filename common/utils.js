exports.ajvErrors = function (error, callback) {
  let errorField = error[0].dataPath;
  errorField = errorField.split(".");
  errorField = errorField[errorField.length - 1];
  var errMsg = errorField + " " + error[0].message;
  var displayMsg = `The provided value for ${errorField} is not valid`;
  const validationMsg = "Validation Failed For Provided Request";
  return callback(displayMsg);
};