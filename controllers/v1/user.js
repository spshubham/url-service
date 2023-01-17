"use strict";

var utils = require("../../utils/writer.js");
var User = require("../../service/user");
module.exports.signUp = function signUp (req, res, next, body) {
  User.signUp(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};



module.exports.getDetails = function getDetails (req, res, next, email, password, ) {
  User.getDetails(email, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
