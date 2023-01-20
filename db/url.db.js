const Url = require("../models/url.model");
const Response = require("../utils/response");
const bcrypt = require("bcrypt")
const ObjectId = require("mongoose").Types.ObjectId

/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @returns url added message
 */
exports.addUrl = async(body, user_id) =>{
    try {
        body.user_id=user_id;
        let url = new Url(body);
        const res = await url.save(url)
        return res;
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}

/**
 * 
 * @param {*} body 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns update the url
 */
exports.updateUrl = async(body, user_id, url_id) =>{
    try {
        let query={
            url_name: body.url_name,
            frequency: body.frequency
        }  
        Object.keys(query).forEach((key)=>typeof query[key] === "undefined" && delete query[key])
         console.log(query);
        let res = await Url.findOneAndUpdate({_id:url_id,user_id:user_id},query)
        return res;
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}
/**
 * 
 * @param {*} user_id 
 * @returns  list of urls
 */
exports.listUrl = async(user_id) =>{
    try {
        let res = await Url.find({user_id:ObjectId(user_id)}).select({"_id":1,"url_name":1})
        return res
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}

/**
 * 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns remove the urls
 */
exports.removeUrl = async(user_id, url_id) =>{
    try {
        let res = await Url.deleteOne({_id:url_id,user_id:user_id})
        return res;
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}

/**
 * 
 * @param {*} user_id 
 * @param {*} url_id 
 * @returns track the url
 */
exports.trackUrl = async(user_id, url_id) =>{
    try {
         let res = await Url.findOne({_id:url_id,user_id:user_id}).select({"url_name":1,"url_status.time":1,"url_status.status":1,"_id":0})

        return res
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}