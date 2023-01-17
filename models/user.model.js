 var mongoose = require("mongoose");
 var user = mongoose.Schema({
   name: {
    type: String,
     required: true
   },
   age: {
    type: Number,
    required: true
  },
   email: {
     type: String,
     required: true,
     unique: true
   },
   password: {
     type: String,
     required: true
   },
   city: {
    type: String,
    required: true
  },
  token: { type: String }
  
 }, { timestamps: true });
 
 user.index({email:1}, {unique: true})

module.exports = mongoose.model("User", user);
