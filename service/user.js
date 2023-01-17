"use strict";
var Response = require("../utils/response");
const validate = require("../utils/validation")
const Userdb = require("../db/user.db")
const jwt = require('jsonwebtoken');
const conf = require("../conf/conf")

exports.signUp = async function (body) {
  try {
    let valid = validate.isValidRegisterUserBody(body);
    if (!valid.isValid) {
      throw valid.payload;
    }
    
    const user = await Userdb.create(body);
    // const token = jwt.sign(
    //   { user_id: user._id, email:body.email },
    //   conf.JWT_SECRET_KEY,
    //   {
    //     expiresIn: "2m",
    //   }
    // );
    // // save user token
    // user.token = token;
    return user
  } catch (error) {
    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};


exports.getDetails = async function (email, password) {
  try {

    if (!email || !password) {
      throw Response.InvalidReqBody
    }

    const user = await Userdb.findByEmailAndPassword(email, password);

    if (user == null) {
      throw Response.InvalidUserAndMail;
    }
    const token = jwt.sign(
      { user_id: user._id, email },
      conf.JWT_SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );
    let res={}
    res.message = "Login successful and use token to authenticate"
    res.token = token
    return res;
  } catch (error) {
    if (error.code) throw error
    throw Response.UnexpectedError;

  }
};
