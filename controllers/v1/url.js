"use strict";

var utils = require("../../utils/writer.js");
var Url = require("../../service/url");

module.exports.addUrl = function addUrl (req, res, next, body) {
    Url.addUrl(body,req.user.user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUrl = function updateUrl (req, res, next, body) {
  Url.updateUrl(body,req.user.user_id,req.query["url_id"])
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.listUrl = function listUrl (req, res, next, body) {
  Url.listUrl(req.user.user_id)
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.removeUrl = function removeUrl (req, res, next, body) {
  Url.removeUrl(req.user.user_id,req.query["url_id"])
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.trackUrl = function trackUrl (req, res, next, body) {
  Url.trackUrl(req.user.user_id,req.query["url_id"])
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};
