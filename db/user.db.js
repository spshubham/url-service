
const User = require("../models/user.model");
const Response = require("../utils/response");
const bcrypt = require("bcrypt")

/**
 * 
 * @param {*} body 
 * @returns user registered message
 */
exports.create = async(body) =>{
    try {
        let pass = body.password;
        
        const hash = await bcrypt.hash(body.password, 10);
        // Store hash in the database
        body.password=hash;
        let user = new User(body);
        const res = await user.save(user)
        return res;
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns finds the valid user
 */
exports.findByEmailAndPassword = async(email, password) => {
    try {
        
        let user = await User.findOne({email : email});
        if(!user)
            throw Response.InvalidUserAndMail;
        const result = await bcrypt.compare(password,user.password);
        if(!result) { throw Response.InvalidUserAndMail;}
        return user;
    } catch (error) {console.log(error);
        if(error.code)
            throw error;
        else
            throw Response.UnexpectedError;
    }
}

