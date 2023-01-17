var mongoose = require("mongoose");
var url = mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  url_name: {
   type: String,
    required: true
  },
  frequency: {
    type: Number,
    required: true
   },
  url_status: [{
    status:{
      type:String,
      enum: ["Active", "Inactive"]
    },
    time:{
      type: Number
    }
  }]
 

}, { timestamps: true });

module.exports = mongoose.model("Url", url);