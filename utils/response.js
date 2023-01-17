let response = require("./writer").respondWithCode;


exports.UnexpectedError = response(500, {
    message: "Internal server error"
});
exports.UserAlreayExist = response(400, {
    message: "User already exist"
});

exports.InvalidEmail = response(400, {
    message: "Invalid Email id"
});
exports.InvalidUserName = response(400, {
    message: "Invalid name"
});
exports.InvalidCity = response(400, {
  message: "Invalid city"
});
exports.InvalidAge = response(400, {
  message: "Invalid age"
});
exports.InvalidUserAndMail = response(400, {
    message: "Incorrect Email id or Password"
});

exports.InvalidPassword = response(400, {
    message : "Password should be string and lenght should be greater than 7"
});

exports.InvalidReqBody = response(400, {
    message : "Invalid Request body"
});


exports.InvalidURL = response(400, {
    message: "Invalid URL"
  });

exports.InvalidFrequency = response(400, {
    message: "Invalid Frequency"
  });

exports.URLUpdated = response(200, {
    message: "Successfully updated"
  });

exports.RecordNotFound = response(404, {
    message: "Record Not Found"
  });  

  exports.URLDeleted = response(200, {
    message: "Successfully Deleted"
  });
  

  exports.InvalidURLId = response(400, {
    message: "Invalid URL Id"
  });