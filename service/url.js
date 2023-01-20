"use strict";
var Response = require("../utils/response");
const validate = require("../utils/validation")

const UrlDb = require("../db/url.db");
const jwt = require('jsonwebtoken');
const conf = require("../conf/conf")


/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @returns add the url in db
 */
exports.addUrl = async function (body, user_id) {
  try {
    if (body) {
      if (!body.url_name || !body.frequency) {
        throw Response.InvalidReqBody;
      }
      let valid = validate.validateURLReq(body);
      if (!valid.isValid) {
        throw valid.payload;
      }

    }
    const url = await UrlDb.addUrl(body, user_id);
    return url
  } catch (error) {

    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};


/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns update the given url
 */
exports.updateUrl = async function (body, user_id, url_id) {
  try {
    if (!validate.isValidMongooseObjectId(url_id))
      return Response.InvalidURLId
    if (body) {
      let valid = validate.validateURLReq(body);
      if (!valid.isValid) {
        throw valid.payload;
      }
    }
    const url = await UrlDb.updateUrl(body, user_id, url_id);
    if (url)
      return Response.URLUpdated;
    else return Response.RecordNotFound
  } catch (error) {

    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};


/**
 * 
 * @param {*} user_id 
 * @returns list the url
 */
exports.listUrl = async function (user_id) {
  try {
    const url = await UrlDb.listUrl(user_id);
    if (url)
      return url;
    else return Response.RecordNotFound

  } catch (error) {

    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};

/**
 * 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns delete the url
 */

exports.removeUrl = async function (user_id, url_id) {
  try {
    if (!validate.isValidMongooseObjectId(url_id))
      return Response.InvalidURLId
    const url = await UrlDb.removeUrl(user_id, url_id);
    if (url.deletedCount)
      return Response.URLDeleted;
    else return Response.RecordNotFound
  } catch (error) {

    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};


/**
 * 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns track the url
 */
exports.trackUrl = async function (user_id, url_id) {
  try {
    if (!validate.isValidMongooseObjectId(url_id))
      return Response.InvalidURLId
    let url = await UrlDb.trackUrl(user_id, url_id);


    if (url) {
      let url_arr = [...url.url_status];

      url_arr = url_arr.map(doc => {
        let status = {
          status: doc.status,
          time: new Date(doc.time)
        }
        return status
      })

      url = {
        url_name: url.url_name,
        url_status: url_arr
      }
      return url
    } else return Response.RecordNotFound
  } catch (error) {
    console.log(error);
    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};